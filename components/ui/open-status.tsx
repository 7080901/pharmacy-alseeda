"use client"

import { cn } from "@/lib/utils"

interface OpenStatusProps {
  size?: "sm" | "md"
  className?: string
}

export function OpenStatus({ size = "md", className }: OpenStatusProps) {
  const isOpen = true

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1 text-xs font-medium text-slate-800 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
        size === "sm" && "px-2.5 py-0.5 text-[11px]",
        className
      )}
    >
      <span className="relative flex size-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            isOpen ? "bg-emerald-500" : "bg-amber-500"
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            isOpen ? "bg-emerald-500" : "bg-amber-500"
          )}
        />
      </span>
      <span>{isOpen ? "مفتوح الآن" : "مغلق الآن"}</span>
      <span className="text-slate-300 dark:text-slate-600">|</span>
      <span className="text-slate-500 dark:text-slate-400">
        يفتح غداً 8:00 ص
      </span>
    </div>
  )
}