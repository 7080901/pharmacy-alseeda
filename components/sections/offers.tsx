import { REVIEWS } from "@/lib/content"
import { Section, SectionHead } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"

// ============================================================
// آراء الزبائن — نصوص مؤقتة، استبدلها بآراء حقيقية بإذن أصحابها.
// (بطاقات العروض والأرقام والمعرض انتقلت إلى hero-banners.tsx
// وtop-lists.tsx وproduct-tabs.tsx ضمن هيكلة المتجر الجديدة).
// ============================================================
export function Reviews() {
  return (
    <Section tone="white">
      <SectionHead title="ماذا يقول أهل الحي" align="center" />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((review, i) => (
          <Reveal key={i} as="article" delay={i * 90}>
            <blockquote className="h-full rounded-2xl border border-line p-7 transition-colors duration-300 hover:border-green/40">
              <svg viewBox="0 0 24 24" className="size-7 fill-green/25" aria-hidden>
                <path d="M9.4 5.2 6 11.1h3.8V19H2v-7.9l3.7-5.9h3.7Zm12 0L18 11.1h3.8V19H14v-7.9l3.7-5.9h3.7Z" />
              </svg>
              <p className="mt-4 text-[15px] leading-[1.95] text-ink/80">{review.text}</p>
              <footer className="mt-5 border-t border-line pt-4">
                <p className="font-display text-base text-ink">{review.name}</p>
                <p className="text-sm text-ink/55">{review.detail}</p>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
