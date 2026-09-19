"use client"

import Image from "next/image"
import { useState } from "react"
import { Check, ShoppingCart } from "lucide-react"
import { PRODUCTS, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart"
import { Section, SectionHead } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

const TABS = ["الأهم", "الأكثر مبيعًا", "عروض وخصومات"] as const

// ============================================================
// شبكة منتجات بتبويبات، تحاكي قسم "منتجات الرعاية الصحية" في
// الموقع المرجعي. التبويب يُصفّي نفس مصفوفة PRODUCTS محليًا.
// ============================================================
export function ProductTabs() {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0])

  const visible = PRODUCTS.filter((p) => {
    if (tab === "الأكثر مبيعًا") return p.badge === "الأكثر مبيعًا"
    if (tab === "عروض وخصومات") return p.badge === "خصم"
    return true
  })

  return (
    <Section id="products" tone="white">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead title="منتجات الرعاية الصحية" />

        <div className="flex gap-1 rounded-full border border-line bg-mist p-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                tab === t ? "bg-green text-white" : "text-ink/60 hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {visible.map((product, i) => (
          <Reveal key={product.id} delay={i * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

const BADGE_STYLE: Record<NonNullable<Product["badge"]>, string> = {
  "خصم": "bg-amber text-white",
  "جديد": "bg-green text-white",
  "الأكثر مبيعًا": "bg-ink text-mist",
}

function ProductCard({ product }: { product: Product }) {
  const { add, items } = useCart()
  const inCart = items.some((i) => i.id === product.id)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors duration-300 hover:border-green/40">
      <div className="relative aspect-square bg-mist">
        {product.badge && (
          <span
            className={cn(
              "absolute start-2.5 top-2.5 z-10 rounded-full px-2.5 py-1 text-[10px] font-medium",
              BADGE_STYLE[product.badge],
            )}
          >
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-ink/50">{product.category}</p>
        <h3 className="mt-1 line-clamp-2 flex-1 text-sm leading-snug text-ink">{product.name}</h3>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-base text-ink">
            {product.price.toLocaleString("ar-EG")} ريال
          </span>
          {product.oldPrice && (
            <span className="text-xs text-ink/40 line-through">
              {product.oldPrice.toLocaleString("ar-EG")}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => add({ id: product.id, name: product.name, price: product.price })}
          className={cn(
            "mt-3 flex h-10 items-center justify-center gap-2 rounded-full text-xs font-medium transition-colors",
            inCart ? "bg-green/10 text-green" : "bg-green text-white hover:bg-green-deep",
          )}
        >
          {inCart ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
          {inCart ? "أُضيف للسلة" : "أضف للسلة"}
        </button>
      </div>
    </article>
  )
}
