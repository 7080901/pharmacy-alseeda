import { MessageCircle } from "lucide-react"
import { ORDER_STEPS } from "@/lib/content"
import { SITE } from "@/lib/site"
import { Action } from "@/components/ui/action"
import { Section, SectionHead } from "@/components/ui/section"

// ============================================================
// الترقيم هنا مبرَّر: هذه خطوات متسلسلة فعلاً، بعكس بقية الأقسام.
// ============================================================
export function OrderSteps() {
  return (
    <Section id="order" tone="ink">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl leading-tight md:text-[2.6rem] md:leading-[1.15]">
            كيف تطلب دواءك من بيتك
          </h2>
          <p className="mt-4 max-w-md text-base leading-[1.9] text-mist/70">
            ثلاث خطوات، والباقي علينا. التوصيل داخل {SITE.district} في نفس اليوم.
          </p>

          <Action href={SITE.whatsappHref} size="lg" className="mt-8 bg-white text-ink hover:bg-mist">
            <MessageCircle className="size-5" />
            ابدأ على واتساب
          </Action>
        </div>

        <ol className="space-y-px overflow-hidden rounded-2xl bg-mist/15">
          {ORDER_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-5 bg-ink px-6 py-7 md:gap-7 md:px-8">
              <span className="mt-0.5 font-display text-2xl text-green-light tabular-nums">
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.85] text-mist/70">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
