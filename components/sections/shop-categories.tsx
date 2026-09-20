"use client"

import { Baby, Droplet, HeartPulse, Pill, Sparkles, Stethoscope, type LucideIcon } from "lucide-react"
import { SHOP_CATEGORIES } from "@/lib/products"
import { Section, SectionHead } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"

const ICONS: Record<string, LucideIcon> = { Sparkles, Droplet, Baby, Pill, Stethoscope, HeartPulse }

export function ShopCategories() {
  return (
    <Section id="categories" tone="white" className="py-14 md:py-16">
      <SectionHead title="تسوّق حسب الفئة" />

      <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6">
        {SHOP_CATEGORIES.map((cat, i) => {
          const Icon = ICONS[cat.icon]
          return (
            <Reveal key={cat.title} delay={i * 60}>
              <a
                href="#products"
                onClick={() => window.dispatchEvent(new CustomEvent("pharmacy:category", { detail: cat.title }))}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <span className="flex size-20 items-center justify-center rounded-full border border-line bg-mist transition-colors duration-300 group-hover:border-green group-hover:bg-green/10">
                  <Icon className="size-7 text-green" strokeWidth={1.5} />
                </span>
                <span className="text-xs leading-snug text-ink/75">{cat.title}</span>
              </a>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
