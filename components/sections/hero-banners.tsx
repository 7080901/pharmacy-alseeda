import { ArrowLeft } from "lucide-react"
import { SITE } from "@/lib/site"
import { Action } from "@/components/ui/action"

// ============================================================
// شبكة العروض أعلى الصفحة: بطاقتان صغيرتان + بانر كبير.
// يطابق ترتيب الموقع المرجعي (بطاقات صغيرة + بانر بارز) لكن
// بألوان صيدلية السعيد بدل التركواز.
// ============================================================
export function HeroBanners() {
  return (
    <section className="bg-white pt-6">
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-5 md:grid-cols-[1fr_1.2fr] md:px-8">
        {/* بطاقتان صغيرتان */}
        <div className="grid grid-cols-2 gap-4 md:grid-rows-2">
          <div className="rounded-2xl border border-line bg-mist p-5">
            <span className="inline-flex rounded-full bg-green/10 px-2.5 py-1 text-[11px] font-medium text-green">
              عرض اليوم
            </span>
            <p className="mt-3 font-display text-lg leading-snug text-ink">
              خصم 15% على أول طلب لك
            </p>
            <a href="#products" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-green">
              تسوّق الآن
              <ArrowLeft className="size-3.5" strokeWidth={1.75} />
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-mist p-5">
            <span className="inline-flex rounded-full bg-amber/10 px-2.5 py-1 text-[11px] font-medium text-amber-deep">
              عرض محدود
            </span>
            <p className="mt-3 font-display text-lg leading-snug text-ink">
              فيتامينات ومكمّلات خصم 30%
            </p>
            <a href="#products" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-green">
              تسوّق الآن
              <ArrowLeft className="size-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* البانر الكبير */}
        <div className="relative overflow-hidden rounded-2xl bg-green p-8 text-white md:row-span-1">
          <span
            aria-hidden
            className="glow pointer-events-none absolute -end-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl"
          />
          <h2 className="relative max-w-[16ch] font-display text-2xl leading-tight md:text-3xl">
            أفضل العروض بانتظارك، تسوّق بكل خصوصية
          </h2>
          <p className="relative mt-3 max-w-[32ch] text-sm leading-relaxed opacity-85">
            اطلب دواءك وحاجياتك الصحية وسلّمنا التفاصيل على واتساب.
          </p>
          <Action href={SITE.whatsappHref} variant="outline" className="relative mt-6 !border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
            تسوّق الآن
          </Action>
        </div>
      </div>
    </section>
  )
}
