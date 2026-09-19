"use client"

import { useEffect, useState } from "react"
import { formatArabic, getOpenState } from "@/lib/hours"
import type { DayHours } from "@/lib/site"
import { cn } from "@/lib/utils"

// ============================================================
// جدول الدوام مع إبراز اليوم الحالي.
// اليوم يُحدَّد على العميل لأنه يعتمد على الوقت الفعلي.
// ============================================================
export function HoursTable({ hours }: { hours: DayHours[] }) {
  const [todayIndex, setTodayIndex] = useState<number | null>(null)

  useEffect(() => {
    setTodayIndex(getOpenState().todayIndex)
  }, [])

  return (
    <dl className="divide-y divide-line">
      {hours.map((day, index) => {
        const isToday = todayIndex === index

        return (
          <div
            key={day.label}
            className={cn(
              "flex items-baseline justify-between gap-4 px-6 py-3.5 text-[15px]",
              isToday && "bg-green/6",
            )}
          >
            <dt className={cn("text-ink/65", isToday && "font-medium text-green-deep")}>
              {day.label}
              {isToday && <span className="ms-2 text-xs text-green">اليوم</span>}
            </dt>
            <dd
              className={cn("tabular-nums text-ink", isToday && "font-medium text-green-deep")}
              dir="ltr"
            >
              {day.closed
                ? "مغلقة"
                : `${formatArabic(day.open)} — ${formatArabic(day.close)}`}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
