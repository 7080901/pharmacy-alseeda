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
    category: "الفيتامينات",
    price: 1750,
    badge: "الأكثر مبيعًا",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&q=80&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "جهاز قياس السكر مع 25 شريط",
    category: "المستلزمات الطبية",
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
  { id: "p7", name: "سيروم حمض الهيالورونيك 30 مل", category: "العناية بالبشرة", price: 4200, badge: "الأكثر مبيعًا", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&q=80&auto=format&fit=crop" },
  { id: "p8", name: "واقي شمس ملون SPF 50", category: "العناية بالبشرة", price: 3800, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80&auto=format&fit=crop" },
  { id: "p9", name: "شامبو ضد تساقط الشعر 400 مل", category: "العناية بالشعر", price: 2900, badge: "جديد", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&q=80&auto=format&fit=crop" },
  { id: "p10", name: "بلسم مغذي للشعر الجاف", category: "العناية بالشعر", price: 2400, image: "https://images.unsplash.com/photo-1527799820374-dcf8f2d1f8e1?w=300&q=80&auto=format&fit=crop" },
  { id: "p11", name: "مناديل مبللة للأطفال — 72 قطعة", category: "الأم والطفل", price: 1200, image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&q=80&auto=format&fit=crop" },
  { id: "p12", name: "كريم حماية حفاضات الأطفال", category: "الأم والطفل", price: 1800, badge: "الأكثر مبيعًا", image: "https://images.unsplash.com/photo-1584839404042-8bcf0f1b0d4b?w=300&q=80&auto=format&fit=crop" },
  { id: "p13", name: "مكمل أوميغا 3 — 60 كبسولة", category: "الفيتامينات", price: 3600, badge: "جديد", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80&auto=format&fit=crop" },
  { id: "p14", name: "مولتي فيتامين للبالغين", category: "الفيتامينات", price: 4100, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80&auto=format&fit=crop" },
  { id: "p15", name: "جهاز قياس ضغط الدم الرقمي", category: "المستلزمات الطبية", price: 12500, badge: "الأكثر مبيعًا", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&q=80&auto=format&fit=crop" },
  { id: "p16", name: "كمامات طبية — 50 قطعة", category: "المستلزمات الطبية", price: 1500, image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&q=80&auto=format&fit=crop" },
  { id: "p17", name: "غسول فم بالنعناع 500 مل", category: "العناية الشخصية", price: 1700, image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&q=80&auto=format&fit=crop" },
  { id: "p18", name: "مزيل عرق طبي للبشرة الحساسة", category: "العناية الشخصية", price: 2100, badge: "خصم", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&q=80&auto=format&fit=crop" },
  { id: "p19", name: "كريم ليلي مجدد للبشرة", category: "العناية بالبشرة", price: 4600, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&q=80&auto=format&fit=crop" },
  { id: "p20", name: "قناع طين لتنقية البشرة", category: "العناية بالبشرة", price: 2700, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80&auto=format&fit=crop" },
  { id: "p21", name: "زيت أركان مغذي للشعر", category: "العناية بالشعر", price: 3300, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&q=80&auto=format&fit=crop" },
  { id: "p22", name: "ماسك إصلاح الشعر التالف", category: "العناية بالشعر", price: 2800, badge: "خصم", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&q=80&auto=format&fit=crop" },
  { id: "p23", name: "فرشاة شعر للأطفال", category: "العناية بالشعر", price: 1100, image: "https://images.unsplash.com/photo-1527799820374-dcf8f2d1f8e1?w=300&q=80&auto=format&fit=crop" },
  { id: "p24", name: "زجاجة رضاعة مضادة للمغص", category: "الأم والطفل", price: 2300, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&q=80&auto=format&fit=crop" },
  { id: "p25", name: "شامبو أطفال لطيف 200 مل", category: "الأم والطفل", price: 1600, image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=300&q=80&auto=format&fit=crop" },
  { id: "p26", name: "مناديل قطنية للمواليد", category: "الأم والطفل", price: 900, badge: "جديد", image: "https://images.unsplash.com/photo-1544126592-807daa215a2a?w=300&q=80&auto=format&fit=crop" },
  { id: "p27", name: "مكمل المغنيسيوم 60 قرص", category: "الفيتامينات", price: 3200, image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&q=80&auto=format&fit=crop" },
  { id: "p28", name: "فيتامين ب المركب", category: "الفيتامينات", price: 2900, image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=300&q=80&auto=format&fit=crop" },
  { id: "p29", name: "مكمل الحديد 30 كبسولة", category: "الفيتامينات", price: 2500, badge: "الأكثر مبيعًا", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80&auto=format&fit=crop" },
  { id: "p30", name: "ميزان إلكتروني للوزن", category: "المستلزمات الطبية", price: 7800, image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&q=80&auto=format&fit=crop" },
  { id: "p31", name: "علبة إسعافات أولية منزلية", category: "المستلزمات الطبية", price: 6500, badge: "جديد", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300&q=80&auto=format&fit=crop" },
  { id: "p32", name: "جهاز قياس الحرارة الرقمي", category: "المستلزمات الطبية", price: 1900, image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=300&q=80&auto=format&fit=crop" },
  { id: "p33", name: "كريم يدين مرطب", category: "العناية الشخصية", price: 1400, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&q=80&auto=format&fit=crop" },
  { id: "p34", name: "غسول جسم منعش", category: "العناية الشخصية", price: 2200, image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=300&q=80&auto=format&fit=crop" },
  { id: "p35", name: "معجون أسنان للحساسية", category: "العناية الشخصية", price: 1300, badge: "الأكثر مبيعًا", image: "https://images.unsplash.com/photo-1559591937-e2e8c0f3bcd8?w=300&q=80&auto=format&fit=crop" },
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
