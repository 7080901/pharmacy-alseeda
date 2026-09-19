"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

// ============================================================
// سلة بسيطة في الذاكرة (تُفرّغ عند تحديث الصفحة). لا يوجد دفع
// إلكتروني هنا — السلة تجهّز قائمة الطلب لإرسالها على واتساب،
// لأن الصيدلية تُتمّم الطلبات عبر التواصل المباشر، لا بوابة دفع.
// ============================================================

type CartItem = { id: string; name: string; price: number; qty: number }

type CartContextValue = {
  items: CartItem[]
  count: number
  add: (item: Omit<CartItem, "qty">) => void
  whatsappText: string
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = (item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const whatsappText = useMemo(() => {
    if (items.length === 0) return "مرحبًا، أرغب في الاستفسار عن دواء."
    const lines = items.map((i) => `- ${i.name} × ${i.qty}`).join("\n")
    return `مرحبًا، أرغب في طلب:\n${lines}`
  }, [items])

  return (
    <CartContext.Provider value={{ items, count, add, whatsappText }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
