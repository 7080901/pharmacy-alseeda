import { Plus } from "lucide-react"
import { FAQ } from "@/lib/content"
import { Section, SectionHead } from "@/components/ui/section"

// ============================================================
// مبني على <details>/<summary> الأصليين: يعمل بدون JavaScript،
// ومدعوم بالكامل من لوحة المفاتيح وقارئات الشاشة.
// ============================================================
export function Faq() {
  return (
    <Section id="faq" tone="white">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHead title="أسئلة تصلنا كل يوم" />

        <div className="divide-y divide-line border-y border-line">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-start focus-visible:outline-none focus-visible:text-green [&::-webkit-details-marker]:hidden">
                <span className="font-display text-lg leading-snug text-ink group-open:text-green">
                  {item.q}
                </span>
                <Plus
                  className="size-5 shrink-0 text-ink/40 transition-transform duration-200 group-open:rotate-45 group-open:text-green motion-reduce:transition-none"
                  strokeWidth={1.75}
                />
              </summary>
              <p className="pb-5 pe-11 text-[15px] leading-[1.9] text-ink/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
