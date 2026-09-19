import Image from "next/image"
import { NEWEST, TOP_RATED, BEST_SELLING, HEALTH_TIPS } from "@/lib/products"
import { Section, SectionHead } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

const COLUMNS = [
  { title: "أحدث المنتجات", items: NEWEST },
  { title: "الأعلى تقييمًا", items: TOP_RATED },
  { title: "الأكثر مبيعًا", items: BEST_SELLING },
]

// ============================================================
// ثلاثة أعمدة مختصرة — بديل خفيف لصفحة "منتجات" كاملة، يعطي
// الزائر نظرة سريعة بدون تحميل بيانات إضافية.
// ============================================================
export function TopLists() {
  return (
    <Section tone="white" className="py-14 md:py-16">
      <div className="grid gap-10 md:grid-cols-3">
        {COLUMNS.map((col, colIndex) => (
          <Reveal key={col.title} delay={colIndex * 100}>
            <h3 className="font-display text-lg text-ink">{col.title}</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {col.items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-3.5">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-mist">
                    <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-ink">{item.name}</span>
                  <span className="shrink-0 text-sm font-medium text-green">
                    {item.price.toLocaleString("ar-EG")} ريال
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

const TONE: Record<string, string> = {
  green: "bg-green text-white",
  amber: "bg-amber text-white",
  ink: "bg-ink text-mist",
}

// ============================================================
// بطاقات نصائح صحية — الأولى بصورة، والبقية بلون كامل، كما في
// الموقع المرجعي.
// ============================================================
export function HealthTips() {
  return (
    <Section tone="white">
      <SectionHead title="نصائح من خبراء الصحة" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HEALTH_TIPS.map((tip, i) => (
          <Reveal key={tip.title} delay={i * 80}>
            <article
              className={cn(
                "flex h-56 flex-col justify-end overflow-hidden rounded-2xl p-6",
                "image" in tip && tip.image ? "relative border border-line bg-mist" : TONE[(tip as any).tone ?? "green"],
              )}
            >
              {"image" in tip && tip.image && (
                <>
                  <Image src={tip.image} alt={tip.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                </>
              )}
              <div className="relative">
                <p className={cn("text-xs opacity-80", "image" in tip && tip.image && "text-white")}>{tip.meta}</p>
                <h3 className={cn("mt-2 font-display text-lg leading-snug", "image" in tip && tip.image && "text-white")}>
                  {tip.title}
                </h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
