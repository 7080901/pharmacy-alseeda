import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { HOURS, SITE } from "@/lib/site"
import { Action } from "@/components/ui/action"
import { Section, SectionHead } from "@/components/ui/section"
import { HoursTable } from "@/components/ui/hours-table"

const CHANNELS = [
  { icon: Phone, label: "الهاتف", value: SITE.phone, href: SITE.phoneHref },
  { icon: MessageCircle, label: "واتساب", value: SITE.whatsapp, href: SITE.whatsappHref },
  { icon: Mail, label: "البريد", value: SITE.email, href: `mailto:${SITE.email}` },
]

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`

export function Contact() {
  return (
    <Section id="contact">
      <SectionHead
        title="زرنا أو كلّمنا"
        lede={`نحن في ${SITE.addressLine}. اتصل بنا في أي وقت خلال الدوام.`}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* الخريطة */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <iframe
            src={MAP_SRC}
            title={`موقع ${SITE.name} على الخريطة`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full border-0 lg:h-full lg:min-h-[460px]"
          />
        </div>

        <div className="space-y-6">
          {/* طرق التواصل */}
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {CHANNELS.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-mist focus-visible:outline-none focus-visible:bg-mist"
                >
                  <Icon className="size-5 shrink-0 text-green" strokeWidth={1.75} />
                  <span className="min-w-0">
                    <span className="block text-xs text-ink/55">{label}</span>
                    <span className="block truncate text-[15px] text-ink" dir="ltr">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* جدول الدوام */}
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <h3 className="border-b border-line px-6 py-4 font-display text-lg text-ink">
              ساعات الدوام
            </h3>
            <HoursTable hours={HOURS} />
          </div>

          <Action href={SITE.whatsappHref} size="lg" className="w-full">
            <MessageCircle className="size-5" />
            راسلنا على واتساب
          </Action>

          <p className="flex items-start gap-2 text-sm leading-relaxed text-ink/55">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {SITE.addressLine}
          </p>
        </div>
      </div>
    </Section>
  )
}
