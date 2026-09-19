import { HOURS, type DayHours } from "./site"

// ============================================================
// حساب حالة الصيدلية الآن.
// يعتمد على توقيت عدن (UTC+3) وليس توقيت جهاز الزائر،
// حتى تكون الحالة صحيحة لمن يتصفح من خارج اليمن.
// ============================================================

const TIME_ZONE = "Asia/Aden"

type NowInAden = { dayIndex: number; minutes: number }

function readNow(date: Date): NowInAden {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0"

  const weekdayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  }

  return {
    dayIndex: weekdayMap[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  }
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

export type OpenState = {
  isOpen: boolean
  /** نص قصير يشرح الحالة، مثل "يُغلق 11:00 م" أو "يفتح غدًا 8:00 ص" */
  detail: string
  todayIndex: number
}

function formatArabic(time: string): string {
  const [h, m] = time.split(":").map(Number)
  const period = h >= 12 ? "م" : "ص"
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`
}

function nextOpenDay(fromIndex: number): { day: DayHours; offset: number } {
  for (let offset = 1; offset <= 7; offset++) {
    const day = HOURS[(fromIndex + offset) % 7]
    if (!day.closed) return { day, offset }
  }
  return { day: HOURS[fromIndex], offset: 1 }
}

export function getOpenState(now: Date = new Date()): OpenState {
  const { dayIndex, minutes } = readNow(now)
  const today = HOURS[dayIndex]

  const buildClosed = (): OpenState => {
    const { day, offset } = nextOpenDay(dayIndex)
    const when = offset === 1 ? "غدًا" : day.label
    return {
      isOpen: false,
      detail: `يفتح ${when} ${formatArabic(day.open)}`,
      todayIndex: dayIndex,
    }
  }

  if (today.closed) return buildClosed()

  const opensAt = toMinutes(today.open)
  const closesAt = toMinutes(today.close)

  if (minutes < opensAt) {
    return {
      isOpen: false,
      detail: `يفتح اليوم ${formatArabic(today.open)}`,
      todayIndex: dayIndex,
    }
  }

  if (minutes >= closesAt) return buildClosed()

  return {
    isOpen: true,
    detail: `يُغلق ${formatArabic(today.close)}`,
    todayIndex: dayIndex,
  }
}

export { formatArabic }
