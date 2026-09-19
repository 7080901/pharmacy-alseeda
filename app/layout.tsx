import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google"
import { SITE } from "@/lib/site"
import { CartProvider } from "@/lib/cart"
import "./globals.css"
import { ThemeProvider } from "./providers"

// خط النصوص: دقيق ومقروء، قريب من طباعة نشرة الدواء
const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

// خط العناوين: هندسي دافئ، يميّز العناوين بوضوح عن النص
const display = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.city}، ${SITE.district}`,
  description: `صيدلية السعيد في ${SITE.district} بمدينة ${SITE.city}: صرف الوصفات الطبية، استشارة صيدلانية، قياس الضغط والسكر، وتوصيل داخل المنطقة.`,
  keywords: ["صيدلية", SITE.city, SITE.district, "أدوية", "توصيل أدوية", "صيدلية السعيد"],
  openGraph: {
    title: `${SITE.name} — ${SITE.city}، ${SITE.district}`,
    description: `دواؤك متوفّر، والصيدلي يشرح لك كيف تأخذه. توصيل داخل ${SITE.district}.`,
    locale: "ar_YE",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0B6B45",
}

// بيانات منظّمة تساعد جوجل على عرض العنوان وساعات العمل في نتائج البحث
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  name: SITE.name,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.district,
    addressRegion: SITE.city,
    addressCountry: "YE",
  },
  telephone: SITE.phone,
  openingHours: ["Sa-Th 08:00-23:00", "Fr 14:00-23:00"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${body.variable} ${display.variable}`}>
      <body>
        <ThemeProvider>
        <CartProvider>{children}</CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          </ThemeProvider>
      </body>
    </html>
  )
}
