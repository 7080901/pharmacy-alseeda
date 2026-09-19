import { Activity, Bike, FileText, Stethoscope, type LucideIcon } from "lucide-react"
import { SERVICES } from "@/lib/content"
import { Section, SectionHead } from "@/components/ui/section"

// خريطة الأيقونات: تبقي المحتوى في lib/content.ts نصًا خالصًا
const ICONS: Record<string, LucideIcon> = {
  Stethoscope,
  Activity,
  FileText,
  Bike,
}

export function Services() {
  return (
    <Section id="services" tone="white">
      <SectionHead
        title="ما نقدّمه داخل الصيدلية"
        lede="خدمات يومية لا تحتاج موعدًا، يقدّمها صيدلي مرخّص."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {SERVICES.map((service) => {
          const Icon = ICONS[service.icon]
          return (
            <article key={service.title} className="bg-white p-7 md:p-8">
              <Icon className="size-6 text-green" strokeWidth={1.75} />
              <h3 className="mt-5 font-display text-xl text-ink">{service.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.85] text-ink/70">{service.body}</p>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

// ملاحظة: قسم "ما تجده على الرفوف" النصي حُذف لتفادي التكرار مع
// ShopCategories (شبكة الفئات الأيقونية) وProductTabs (شبكة المنتجات)
// في components/sections/shop-categories.tsx وproduct-tabs.tsx.
// CATEGORIES في lib/content.ts أصبحت غير مستخدَمة — احذفها إن أردت.
