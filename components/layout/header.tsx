"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Heart, Menu, Phone, Search, ShoppingCart, X } from "lucide-react"
import { SITE } from "@/lib/site"
import { PRODUCTS } from "@/lib/products"
import { useCart } from "@/lib/cart"
import { cn } from "@/lib/utils"
import { OpenStatus } from "@/components/ui/open-status"
import { Mark } from "@/components/layout/header-mark"
import { ThemeToggle } from "@/components/ui/theme-toggle"

/* ============================================================
 * 1) الثوابت
 * ============================================================ */

const NAV_ITEMS = [
  { label: "الرئيسية", href: "#top" },
  { label: "الفئات", href: "#categories" },
  { label: "المنتجات", href: "#products" },
  { label: "الخدمات", href: "#services" },
  { label: "المخاوف الصحية", href: "#concerns" },
  { label: "تواصل معنا", href: "#contact" },
] as const

const MAX_SEARCH_RESULTS = 5

const ICON_BUTTON_CLASS = cn(
  "flex size-11 items-center justify-center rounded-full text-slate-700 dark:text-slate-200",
  "transition-colors hover:bg-slate-100 hover:text-green dark:hover:bg-slate-800 dark:hover:text-green-light",
  "focus-visible:ring-2 focus-visible:ring-green focus-visible:outline-none"
)

/* ============================================================
 * 2) أدوات مساعدة
 * ============================================================ */

function normalizeArabic(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0670]/g, "")
    .replace(/[أإآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim()
}

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ar-SA")} ريال`
}

/* ============================================================
 * 3) المكوّن الرئيسي
 * ============================================================ */

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isWishlistActive, setIsWishlistActive] = useState(false)

  const { count: cartCount } = useCart()
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const closeAllOverlays = useCallback(() => {
    setQuery("")
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllOverlays()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setQuery("")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [closeAllOverlays])

  const searchResults = useMemo(() => {
    const normalizedQuery = normalizeArabic(query)
    if (!normalizedQuery) return []

    return PRODUCTS.filter((product) =>
      normalizeArabic(product.name).includes(normalizedQuery)
    ).slice(0, MAX_SEARCH_RESULTS)
  }, [query])

  const hasSearchQuery = query.trim().length > 0
  const hasResults = searchResults.length > 0

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-300">
      {/* ===== 1) الشريط العلوي الإخباري ===== */}
      <div className="hidden bg-slate-900 text-slate-100 dark:bg-slate-950 dark:text-slate-300 border-b border-slate-800 md:block">
        <div className="mx-auto flex h-9 w-full max-w-6xl items-center justify-between px-8 text-xs">
          <span>توصيل داخل {SITE.district} خلال ساعتين</span>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-1.5 transition-colors hover:text-green-light"
          >
            <Phone aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
            <span dir="ltr">{SITE.phone}</span>
          </a>
        </div>
      </div>

      {/* ===== 2) الشريط الرئيسي ===== */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center gap-4 px-5 md:px-8">
          
          {/* الشعار */}
          <a href="#top" className="flex shrink-0 items-center gap-3">
            <Mark />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-lg text-slate-900 dark:text-slate-100 font-bold">
                {SITE.name}
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                {SITE.city} — {SITE.district}
              </span>
            </span>
          </a>

          {/* مربع البحث */}
          <div ref={searchContainerRef} className="relative hidden flex-1 md:block">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 start-4 my-auto size-4 text-slate-400 dark:text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن دواء أو منتج..."
              aria-label="بحث في المنتجات"
              aria-controls="header-search-results"
              aria-expanded={hasSearchQuery}
              autoComplete="off"
              className={cn(
                "h-11 w-full rounded-full border border-slate-200 bg-slate-50 ps-11 pe-10 text-sm text-slate-900 placeholder:text-slate-400",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400",
                "outline-none transition-colors focus:border-green dark:focus:border-green-light focus:bg-white dark:focus:bg-slate-900"
              )}
            />
            
            {hasSearchQuery && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="مسح البحث"
                className="absolute inset-y-0 end-3 my-auto flex size-6 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
              >
                <X className="size-4" />
              </button>
            )}

            {/* قائمة نتائج البحث مع نص واضح وخلفية داكنة معتمة */}
            {hasSearchQuery && (
              <div
                id="header-search-results"
                role="listbox"
                className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-2xl"
              >
                {hasResults ? (
                  <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                    {searchResults.map((product) => (
                      <li key={product.id} role="option" aria-selected="false">
                        <a
                          href="#products"
                          onClick={() => setQuery("")}
                          className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80"
                        >
                          <span className="font-medium">{product.name}</span>
                          <span className="shrink-0 text-xs font-semibold text-green dark:text-green-light">
                            {formatCurrency(product.price)}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                    لا توجد نتائج تطابق "{query}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* الأيقونات */}
          <div className="ms-auto flex items-center gap-1.5">
            <OpenStatus size="sm" className="hidden lg:inline-flex" />

            {/* زر الوضع الداكن/الفاتح */}
            <ThemeToggle />

            {/* زر المفضلة */}
            <button
              type="button"
              onClick={() => setIsWishlistActive((prev) => !prev)}
              aria-pressed={isWishlistActive}
              aria-label="المفضلة"
              className={ICON_BUTTON_CLASS}
            >
              <Heart
                aria-hidden="true"
                className={cn("size-5", isWishlistActive && "fill-green text-green dark:fill-green-light dark:text-green-light")}
                strokeWidth={1.75}
              />
            </button>

            {/* زر السلة */}
            <a
              href="#products"
              aria-label="السلة"
              className={cn(ICON_BUTTON_CLASS, "relative")}
            >
              <ShoppingCart aria-hidden="true" className="size-5" strokeWidth={1.75} />
              {cartCount > 0 && (
                <span
                  aria-label={`${cartCount} عناصر في السلة`}
                  className="absolute -top-0.5 end-0 flex size-[18px] items-center justify-center rounded-full bg-green text-[10px] font-medium text-white dark:bg-green-light dark:text-slate-950"
                >
                  {cartCount}
                </span>
              )}
            </a>

            {/* زر القائمة للشاشات الصغيرة */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              className={cn(ICON_BUTTON_CLASS, "lg:hidden")}
            >
              {menuOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== 3) شريط التنقل الرئيسي ===== */}
      <div className="hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 lg:block">
        <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-8">
          <nav aria-label="التنقّل الرئيسي" className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-700 dark:text-slate-200 transition-colors hover:text-green dark:hover:text-green-light font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={SITE.whatsappHref}
            className="rounded-full bg-green px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-green-deep dark:bg-green-light dark:text-slate-950 dark:hover:bg-green"
          >
            اطلب على واتساب
          </a>
        </div>
      </div>

      {/* ===== 4) القائمة الجانبية (الجوال) ===== */}
      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden bg-white dark:bg-slate-900 transition-[grid-template-rows] duration-300 lg:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3">
            
            {/* شريط البحث للجوال */}
            <div className="relative md:hidden">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-slate-400 dark:text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 ps-9 pe-4 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-green dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-green-light"
              />
            </div>

            {/* روابط الجوال */}
            <nav aria-label="قائمة الجوال" className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeAllOverlays}
                  className="border-b border-slate-100 dark:border-slate-800 py-3 text-[15px] text-slate-800 dark:text-slate-200 transition-colors hover:text-green dark:hover:text-green-light last:border-0"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <OpenStatus size="sm" className="my-2 self-start" />
          </div>
        </div>
      </div>
    </header>
  )
}