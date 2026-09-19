import {
  Activity, Bone, Droplet, HeartPulse, Salad, Smile, Sparkles, Wind, type LucideIcon,
} from "lucide-react"
import { HEALTH_CONCERNS } from "@/lib/products"
import { SITE } from "@/lib/site"
import { Action } from "@/components/ui/action"
import { Section, SectionHead } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"

const ICONS: Record<string, LucideIcon> = { Salad, Bone, Smile, Wind, HeartPulse, Sparkles, Droplet, Activity }

export function HealthConcerns() {
  return (
    <Section id="concerns" tone="white">
      <SectionHead title="تسوّق حسب المخاوف الصحية" lede="اختر ما يهمّك لنساعدك في إيجاد المنتج المناسب." />

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {HEALTH_CONCERNS.map((c, i) => {
          const Icon = ICONS[c.icon]
          return (
            <Reveal key={c.title} delay={i * 50}>
              <a
                href="#products"
                className="group flex items-center gap-3 rounded-xl border border-line px-4 py-3.5 transition-colors duration-300 hover:border-green/40 hover:bg-green/5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mist text-green">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="text-sm text-ink">{c.title}</span>
              </a>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

// ============================================================
// بانر ترويجي ثانٍ — شريط ملوّن كامل العرض، مثل شريط الهدية
// أسفل الصفحة الرئيسية في الموقع المرجعي.
// ============================================================
export function PromoBanner() {
  return (
    <section className="bg-green py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-5 text-white md:px-8">
        <p className="font-display text-xl leading-snug md:text-2xl">
          احصل على خصم 25% عند الاشتراك في نشرتنا الصحية
        </p>
        <Action href={SITE.whatsappHref} variant="outline" className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
          اشترك الآن
        </Action>
      </div>
    </section>
  )
}
