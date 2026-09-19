"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useReveal } from "@/lib/use-reveal"
import { cn } from "@/lib/utils"

// ============================================================
// غلاف الظهور عند التمرير. يُستخدم في كل الأقسام بدل تكرار
// كلاسات الأنيميشن يدويًا في كل مكان.
// ============================================================
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode
  /** تأخير بالملي ثانية لتتابع العناصر */
  delay?: number
  as?: "div" | "li" | "article" | "section"
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]",
        "motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

// ============================================================
// رقم يعدّ تصاعديًا عند ظهوره. يتوقف فورًا مع تقليل الحركة.
// ============================================================
export function CountUp({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number
  suffix?: string
  duration?: number
}) {
  const { ref, shown } = useReveal<HTMLSpanElement>()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!shown) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to)
      return
    }

    let frame: number
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // تباطؤ في النهاية ليبدو العدّ طبيعيًا
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(to * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [shown, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("ar-EG")}
      {suffix}
    </span>
  )
}
