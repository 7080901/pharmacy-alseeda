// ============================================================
// بيانات المتجر. أسماء المنتجات أدناه لأصناف شائعة تبيعها أي
// صيدلية عادةً (بانادول، دوركس...) كأمثلة توضيحية — تحقق من
// توفّرها الفعلي وسعرها الحقيقي قبل النشر.
// ============================================================

export type Product = {
  id: string
  name: string
  category: string
  price: number
  oldPrice?: number
  badge?: "خصم" | "جديد" | "الأكثر مبيعًا"
  image: string
}

// أيقونات lucide-react بالاسم — تُحوَّل في المكوّن
export const SHOP_CATEGORIES = [
  { title: "العناية بالبشرة", icon: "Sparkles" },
  { title: "العناية بالشعر", icon: "Droplet" },
  { title: "الأم والطفل", icon: "Baby" },
  { title: "الفيتامينات", icon: "Pill" },
  { title: "المستلزمات الطبية", icon: "Stethoscope" },
  { title: "العناية الشخصية", icon: "HeartPulse" },
] as const

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "بانادول إكسترا 24 قرص",
    category: "مسكنات",
    price: 1900,
    oldPrice: 2300,
    badge: "خصم",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "فيتامين د 1000 وحدة — 30 كبسولة",
    category: "فيتامينات",
    price: 1750,
    badge: "الأكثر مبيعًا",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "جهاز قياس السكر مع 25 شريط",
    category: "مستلزمات طبية",
    price: 8500,
    oldPrice: 9800,
    badge: "خصم",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "أقراص استحلاب للحلق — 24 قرص",
    category: "نزلات البرد",
    price: 950,
    image: "https://images.unsplash.com/photo-1550572017-9a3d1a0d6d97?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "كريم مرطب للبشرة الحساسة 200 مل",
    category: "العناية بالبشرة",
    price: 3400,
    badge: "جديد",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "حليب أطفال — عمر 6 إلى 12 شهر",
    category: "الأم والطفل",
    price: 6200,
    oldPrice: 6900,
    badge: "خصم",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&q=80&auto=format&fit=crop",
  },
] as const

export const NEWEST: Pick<Product, "id" | "name" | "price" | "image">[] = [
  { id: "n1", name: "غسول للبشرة الدهنية 150 مل", price: 2200, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&q=80&auto=format&fit=crop" },
  { id: "n2", name: "شراب سعال للأطفال 120 مل", price: 1400, image: "https://images.unsplash.com/photo-1550572017-9a3d1a0d6d97?w=120&q=80&auto=format&fit=crop" },
  { id: "n3", name: "زيت للشعر المتساقط 100 مل", price: 3100, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=120&q=80&auto=format&fit=crop" },
] as const

export const TOP_RATED: typeof NEWEST = [
  { id: "t1", name: "فيتامين سي فوّار — 20 قرص", price: 1250, image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=120&q=80&auto=format&fit=crop" },
  { id: "t2", name: "كمّادة حرارية قابلة لإعادة الاستخدام", price: 1800, image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=120&q=80&auto=format&fit=crop" },
  { id: "t3", name: "واقي شمس SPF 50+ للوجه", price: 2900, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&q=80&auto=format&fit=crop" },
] as const

export const BEST_SELLING: typeof NEWEST = [
  { id: "b1", name: "بانادول إكسترا 24 قرص", price: 1900, image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=120&q=80&auto=format&fit=crop" },
  { id: "b2", name: "أقراص استحلاب للحلق", price: 950, image: "https://images.unsplash.com/photo-1550572017-9a3d1a0d6d97?w=120&q=80&auto=format&fit=crop" },
  { id: "b3", name: "جهاز قياس ضغط الدم المنزلي", price: 12500, image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=120&q=80&auto=format&fit=crop" },
] as const

export const HEALTH_CONCERNS = [
  { title: "المعدة", icon: "Salad" },
  { title: "العظام", icon: "Bone" },
  { title: "الأسنان", icon: "Smile" },
  { title: "الجهاز التنفسي", icon: "Wind" },
  { title: "القلب", icon: "HeartPulse" },
  { title: "البشرة", icon: "Sparkles" },
  { title: "السكري", icon: "Droplet" },
  { title: "الكلى", icon: "Activity" },
] as const

export const HEALTH_TIPS = [
  {
    title: "فيتامينات سي: جرعتك اليومية من الصحة",
    meta: "5 دقائق قراءة",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&q=80&auto=format&fit=crop",
  },
  {
    title: "حب الشباب — الأسباب والعلاج",
    meta: "6 دقائق قراءة",
    tone: "green" as const,
  },
  {
    title: "أفضل غسول للبشرة الدهنية للمراهقين",
    meta: "4 دقائق قراءة",
    tone: "amber" as const,
  },
  {
    title: "دليلك الكامل لاختيار فيتامينات الأطفال",
    meta: "7 دقائق قراءة",
    tone: "ink" as const,
  },
] as const
