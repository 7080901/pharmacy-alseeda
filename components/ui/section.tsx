import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// ============================================================
// غلاف القسم. يوحّد العرض الأقصى والحشو الأفقي والرأسي
// حتى لا تتكرر هذه الكلاسات في كل قسم.
// ============================================================
export function Section({
  id,
  tone = "mist",
  className,
  children,
}: {
  id?: string
  /** خلفية القسم: mist افتراضية، white للتباين، ink للأقسام الداكنة */
  tone?: "mist" | "white" | "ink"
  className?: string
  children: ReactNode
}) {
  const tones = {
    mist: "bg-mist text-ink",
    white: "bg-white text-ink",
    ink: "bg-ink text-mist",
  }

  return (
    <section id={id} className={cn("py-20 md:py-28", tones[tone], className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  )
}

// ============================================================
// رأس القسم: عنوان + سطر تعريفي اختياري.
// بدون "eyebrow" مرقّم — الترقيم يُستخدم فقط حيث يوجد تسلسل حقيقي.
// ============================================================
export function SectionHead({
  title,
  lede,
  align = "start",
  className,
}: {
  title: string
  lede?: string
  align?: "start" | "center"
  className?: string
}) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 className="font-display text-3xl leading-tight md:text-[2.6rem] md:leading-[1.15]">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 text-base leading-[1.9] text-ink/70">{lede}</p>
      )}
    </header>
  )
}
