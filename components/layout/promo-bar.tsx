"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Sparkles, X } from "lucide-react"
import { PROMO } from "@/lib/content"
import { cn } from "@/lib/utils"

/* ============================================================
 * 1) الثوابت — مصدر واحد للحقيقة
 * ============================================================ */

/** ارتفاع شريط العرض بالبكسل */
const BAR_HEIGHT = 44

/** فاصل تحديث العدّاد التنازلي */
const TICK_INTERVAL_MS = 30_000

/** مفتاح حفظ حالة الإغلاق في الجلسة */
const STORAGE_KEY = "promo-dismissed"

/** الثوابت الزمنية بالمللي ثانية */
const MS_MINUTE = 60_000
const MS_HOUR = 60 * MS_MINUTE
const MS_DAY = 24 * MS_HOUR

/** المدة الكاملة الافتراضية للعرض (تُستخدم في شريط التقدّم فقط) */
const DEFAULT_DURATION_MS = 7 * MS_DAY

/** المدة الافتراضية لدورة الحركة (بالثواني) */
const DEFAULT_ANIMATION_DURATION = 6

/* ============================================================
 * 2) الدوال المساعدة (خارج المكوّن لمنع إعادة الإنشاء)
 * ============================================================ */

/**
 * يصوغ عدداً وفق قواعد العدد والمعدود في العربية:
 * 1 → "يوم"، 2 → "يومان"، 3..10 → "3 أيام"، 11+ → "15 يوماً".
 */
function formatArabicUnit(
  count: number,
  single: string,
  dual: string,
  plural: string,
): string {
  if (count === 1) return single
  if (count === 2) return dual
  if (count >= 3 && count <= 10) return `${count} ${plural}`
  return `${count} ${single}`
}

/**
 * يحوّل فارق الوقت حتى نهاية العرض إلى نص عربي مختصر.
 * يعرض وحدتين زمنيتين كحدّ أقصى (الأكبر أولاً) مع تجاهل الأصفار.
 *
 * @example "3 أيام و5 ساعات" — "ساعتان و10 دقائق" — "أقل من دقيقة"
 * @returns النص المتبقي، أو `null` إذا انتهى العرض فعلاً.
 */
function formatRemaining(endsAt: string | number | Date): string | null {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return null

  const days = Math.floor(diff / MS_DAY)
  const hours = Math.floor((diff % MS_DAY) / MS_HOUR)
  const minutes = Math.floor((diff % MS_HOUR) / MS_MINUTE)

  // نُدرج الوحدات غير الصفرية فقط ثم نأخذ أكبرها.
  const parts: string[] = []
  if (days > 0) parts.push(formatArabicUnit(days, "يوم", "يومان", "أيام"))
  if (hours > 0) parts.push(formatArabicUnit(hours, "ساعة", "ساعتان", "ساعات"))
  if (minutes > 0) parts.push(formatArabicUnit(minutes, "دقيقة", "دقيقتان", "دقائق"))

  if (parts.length === 0) return "أقل من دقيقة"
  return parts.slice(0, 2).join(" و")
}

/** يحسب النسبة المتبقية من مدة العرض (0 → 1) لشريط التقدّم. */
function calculateRemainingRatio(
  endsAt: string | number | Date,
  durationMs: number,
): number {
  const remainingMs = new Date(endsAt).getTime() - Date.now()
  if (remainingMs <= 0 || durationMs <= 0) return 0
  return Math.min(1, remainingMs / durationMs)
}

/** قراءة آمنة من sessionStorage (قد يفشل في وضع التصفح الخاص). */
function safeReadStorage(key: string): string | null {
  try {
    return typeof window !== "undefined" ? sessionStorage.getItem(key) : null
  } catch {
    return null
  }
}

/** كتابة آمنة إلى sessionStorage. */
function safeWriteStorage(key: string, value: string): void {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, value)
    }
  } catch {
    /* نتجاهل الفشل: لا يجب أن يكسر الواجهة. */
  }
}

/* ============================================================
 * 3) المكوّن
 * ============================================================ */

type PromoBarProps = {
  /** يُنادى بارتفاع الشريط الفعلي (0 عند الإخفاء). */
  onHeight?: (height: number) => void
  /** المدة الكلية للعرض بالمللي ثانية (تُستخدم لشريط التقدّم فقط). */
  durationMs?: number
  /** مدة دورة الحركة بالثواني (توقف + عودة). */
  animationDuration?: number
}

/**
 * شريط العرض الترويجي العلوي.
 *
 * - يُخفى بعد إغلاق الزائر له، ويتذكّر ذلك داخل الجلسة.
 * - يختفي تلقائياً عند انتهاء مدة العرض.
 * - يعرض عدّاداً تنازلياً وشريط تقدّم بصريّاً.
 * - يُبلّغ المكوّن الأب بارتفاعه لتفادي تراكب المحتوى.
 * - يحترم إعداد "تقليل الحركة" على مستوى النظام.
 */
export function PromoBar({
  onHeight,
  durationMs = DEFAULT_DURATION_MS,
  animationDuration = DEFAULT_ANIMATION_DURATION,
}: PromoBarProps) {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [remainingText, setRemainingText] = useState<string | null>(null)
  const [progressRatio, setProgressRatio] = useState(1)

  // نحتفظ بمرجع محدَّث للدالة حتى لا تُعاد التأثيرات عند تغيّر هويتها.
  const onHeightRef = useRef(onHeight)
  useEffect(() => {
    onHeightRef.current = onHeight
  }, [onHeight])

  /**
   * الإظهار الأولي + العدّاد التنازلي + الإخفاء التلقائي عند الانتهاء.
   *
   * يُعاد تشغيل التأثير عند `dismissed = true` لتنظيف المؤقّت فوراً؛
   * هذا يُصلح علّة إعادة الإظهار بعد الإغلاق اليدوي.
   */
  useEffect(() => {
    if (dismissed) return
    if (safeReadStorage(STORAGE_KEY)) return

    const updateStatus = (): boolean => {
      const timeLeftText = formatRemaining(PROMO.endsAt)

      // انتهى العرض: نُخفيه دون تسجيل "إغلاق يدوي".
      if (!timeLeftText) {
        setVisible(false)
        setRemainingText(null)
        return false
      }

      setRemainingText(timeLeftText)
      setProgressRatio(calculateRemainingRatio(PROMO.endsAt, durationMs))
      setVisible(true)
      return true
    }

    // إن لم يكن العرض سارياً من الأساس، لا نُنشئ مؤقّتاً.
    if (!updateStatus()) return

    const timer = window.setInterval(updateStatus, TICK_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [durationMs, dismissed])

  // إبلاغ المكوّن الأب بالارتفاع الفعلي.
  useEffect(() => {
    onHeightRef.current?.(visible ? BAR_HEIGHT : 0)
  }, [visible])

  const handleDismiss = useCallback(() => {
    safeWriteStorage(STORAGE_KEY, "1")
    setDismissed(true)
    setVisible(false)
  }, [])

  const progressStyle = useMemo(
    () => ({ width: `${progressRatio * 100}%` }),
    [progressRatio],
  )

  /**
   * حركة "توقف وعودة": انزلاق يميناً ← توقف في المنتصف ← انزلاق يساراً،
   * ثم يعكس الإطار الحركة كاملة (`repeatType: "reverse"`).
   * تُلغى كلياً إذا كان المستخدم يفضّل تقليل الحركة.
   */
  const swayProps = prefersReducedMotion
    ? {}
    : {
        animate: { x: [20, 0, 0, -20] },
        transition: {
          duration: animationDuration,
          repeat: Infinity,
          repeatType: "reverse" as const,
          times: [0, 0.35, 0.65, 1],
          ease: "easeInOut" as const,
        },
      }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="شريط العرض الترويجي"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: BAR_HEIGHT, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-[60] overflow-hidden bg-green text-white"
        >
          <div
            className="relative mx-auto flex w-full max-w-6xl items-center justify-center px-12 md:px-8"
            style={{ height: BAR_HEIGHT }}
          >
            {/* المحتوى مع حركة التوقف والعودة */}
            <motion.div
              className="flex items-center gap-3 text-[13px] font-medium"
              {...swayProps}
            >
              <Sparkles
                aria-hidden="true"
                className="size-4 shrink-0 animate-pulse motion-reduce:animate-none"
              />

              <p className="truncate">
                <span className="font-medium">{PROMO.headline}</span>
                {remainingText && (
                  <span className="opacity-80"> — تبقّى {remainingText}</span>
                )}
              </p>

              {PROMO.actionUrl && (
                <a
                  href={PROMO.actionUrl}
                  className="hidden font-semibold underline underline-offset-4 hover:opacity-90 sm:inline-block"
                >
                  {PROMO.actionLabel || "استفد من العرض"}
                </a>
              )}
            </motion.div>

            {/* زر الإغلاق ثابت لا يتأثر بالحركة */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="إغلاق شريط العرض"
              className={cn(
                "absolute end-4 z-10 flex size-7 items-center justify-center rounded-full bg-green/80 backdrop-blur-sm",
                "transition-colors hover:bg-white/20",
                "focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none",
              )}
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>

          {/* شريط التقدّم الزمني */}
          <div
            aria-hidden="true"
            style={progressStyle}
            className={cn(
              "absolute bottom-0 start-0 h-px bg-white/60",
              "transition-[width] duration-1000 ease-linear motion-reduce:transition-none",
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}