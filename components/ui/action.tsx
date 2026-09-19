import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "solid" | "outline" | "quiet"
type Size = "md" | "lg"

const VARIANTS: Record<Variant, string> = {
  solid: "bg-green text-white hover:bg-green-deep",
  outline: "border border-line bg-white text-ink hover:border-green hover:text-green",
  quiet: "text-ink/70 hover:text-green",
}

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
}

// ============================================================
// زر/رابط موحّد. كل أزرار الموقع تمرّ من هنا، فلا تتكرر كلاسات
// الحواف والحشو والتركيز في أي مكان آخر.
// ============================================================
export function Action({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: {
  href: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full font-medium",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-mist",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  )
}
