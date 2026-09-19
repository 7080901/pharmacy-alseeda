/** @type {import('next').NextConfig} */
export default {
  images: {
    // صور المعاينة الحالية من Unsplash (رخصة مجانية للاستخدام التجاري).
    // استبدل هذا النطاق أو أضف نطاقك الخاص عند رفع صور الصيدلية الحقيقية.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
}
