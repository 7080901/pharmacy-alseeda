"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="size-11 rounded-full border border-line/40 bg-mist/20" />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "التحويل للوضع الفاتح" : "التحويل للوضع الداكن"}
      className={cn(
        "flex size-11 items-center justify-center rounded-full text-ink/70",
        "transition-colors hover:bg-mist hover:text-green",
        "focus-visible:ring-2 focus-visible:ring-green focus-visible:outline-none"
      )}
    >
      {isDark ? (
        <Sun className="size-5 text-amber" strokeWidth={1.75} />
      ) : (
        <Moon className="size-5" strokeWidth={1.75} />
      )}
    </button>
  )
}