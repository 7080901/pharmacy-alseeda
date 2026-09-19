"use client"

import { useEffect, useRef, useState } from "react"

// ============================================================
// يرصد دخول العنصر إلى الشاشة مرة واحدة فقط.
// يتجاهل الحركة تمامًا لمن فعّل "تقليل الحركة" في نظامه.
// ============================================================
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, shown }
}
