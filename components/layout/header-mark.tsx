import { cn } from "@/lib/utils"

// ============================================================
// صليب الصيدلة كـ SVG. مكوّن مستقل حتى يستخدمه الهيدر والفوتر
// معًا دون أن يستورد أحدهما من الآخر.
// ============================================================
export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn("flex size-10 items-center justify-center rounded-xl bg-green text-white", className)}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
        <path d="M9.6 2h4.8v7.2H21.6v4.8h-7.2V21h-4.8v-7H2.4V9.2h7.2V2Z" />
      </svg>
    </span>
  )
}
