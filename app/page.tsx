import { PromoBar } from "@/components/layout/promo-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroBanners } from "@/components/sections/hero-banners"
import { ShopCategories } from "@/components/sections/shop-categories"
import { ProductTabs } from "@/components/sections/product-tabs"
import { HealthConcerns, PromoBanner } from "@/components/sections/health-concerns"
import { TopLists, HealthTips } from "@/components/sections/top-lists"
import { Services } from "@/components/sections/services"
import { OrderSteps } from "@/components/sections/order-steps"
import { Team, HealthNotes } from "@/components/sections/team"
import { Reviews } from "@/components/sections/offers"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"

export default function Page() {
  return (
    <>
      <PromoBar />
      <Header />
      <main id="top">
        <HeroBanners />
        <ShopCategories />
        <ProductTabs />
        <HealthConcerns />
        <TopLists />
        <PromoBanner />
        <Services />
        <OrderSteps />
        <HealthTips />
        <Team />
        <Reviews />
        <HealthNotes />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
