"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

// ============================================================
// زر واتساب عائم. يظهر بعد أن يتجاوز الزائر قسم البطل، حتى لا
// يزاحم زر الواتساب الأساسي في الأعلى.
// ============================================================
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <a
      href={SITE.whatsappHref}
      aria-label="راسلنا على واتساب"
      className={cn(
        "group fixed bottom-6 end-5 z-50 flex items-center gap-3 rounded-full bg-green py-4 ps-4 pe-5 text-white shadow-lg shadow-green/25",
        "transition-all duration-300 hover:bg-green-deep",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span className="relative flex size-6 items-center justify-center">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/40 motion-reduce:hidden" />
        <MessageCircle className="relative size-6" strokeWidth={1.75} />
      </span>
      <span className="hidden text-sm font-medium sm:inline">راسلنا</span>
    </a>
  )
}
