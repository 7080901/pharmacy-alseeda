
"use client"


import { Facebook, Instagram, MessageCircle, Phone, Send } from "lucide-react"
import { SITE } from "@/lib/site"
import { Mark } from "@/components/layout/header-mark"

const HELP_LINKS = [
  { label: "عن الصيدلية", href: "#top" },
  { label: "الفئات", href: "#categories" },
  { label: "المنتجات", href: "#products" },
  { label: "أسئلة شائعة", href: "#faq" },
]

const INFO_LINKS = [
  { label: "سياسة الخصوصية", href: "#" },
  { label: "الشروط والأحكام", href: "#" },
  { label: "طرق التوصيل", href: "#order" },
  { label: "تواصل معنا", href: "#contact" },
]

const SOCIAL = [
  { icon: MessageCircle, label: "واتساب", href: SITE.whatsappHref },
  { icon: Phone, label: "اتصال", href: SITE.phoneHref },
  { icon: Facebook, label: "فيسبوك", href: SITE.facebook },
  { icon: Instagram, label: "إنستغرام", href: SITE.instagram },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      {/* ===== النشرة البريدية ===== */}
      <div className="bg-mist">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10 md:px-8">
          <div>
            <h2 className="font-display text-xl text-ink">ليصلك كل جديد</h2>
            <p className="mt-1.5 text-sm text-ink/60">
              أضف بريدك لتصلك أحدث العروض ونصائح الصحة، بلا إزعاج.
            </p>
          </div>

          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="بريدك الإلكتروني"
              className="h-12 flex-1 rounded-full border border-line bg-white px-5 text-sm text-ink outline-none focus:border-green"
            />
            <button
              type="submit"
              className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-green px-5 text-sm font-medium text-white transition-colors hover:bg-green-deep"
            >
              اشتراك
              <Send className="size-4" strokeWidth={1.75} />
            </button>
          </form>
        </div>
      </div>

      {/* ===== أعمدة الفوتر ===== */}
      <div className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <Mark />
                <span className="font-display text-xl text-ink">{SITE.name}</span>
              </div>
              <p className="mt-5 max-w-sm text-[15px] leading-[1.9] text-ink/65">
                صيدلية حيّ تخدم أهالي {SITE.district} في {SITE.city}: صرف وصفات،
                إرشاد دوائي، وتوصيل داخل المنطقة.
              </p>
              <p className="mt-4 text-xs text-ink/45">{SITE.licenseNumber}</p>

              <div className="mt-6 flex gap-3">
                {SOCIAL.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full border border-line text-ink/60 transition-colors hover:border-green hover:text-green"
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="مساعدة">
              <h3 className="text-sm font-medium text-ink">المساعدة</h3>
              <ul className="mt-4 space-y-2.5">
                {HELP_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] text-ink/65 transition-colors hover:text-green">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="معلومات">
              <h3 className="text-sm font-medium text-ink">معلومات</h3>
              <ul className="mt-4 space-y-2.5">
                {INFO_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] text-ink/65 transition-colors hover:text-green">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-14 border-t border-line pt-6">
            <p className="text-[13px] leading-relaxed text-ink/50">
              المعلومات في هذا الموقع إرشادية عامة ولا تُغني عن استشارة الطبيب أو
              الصيدلي. لا تبدأ أو توقف أي دواء بناءً على ما تقرأه هنا.
            </p>
            <p className="mt-4 text-[13px] text-ink/50">
              © {currentYear} {SITE.name} — {SITE.city}. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
