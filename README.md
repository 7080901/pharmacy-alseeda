# صيدلية السعيد — موقع

Next.js 14 (App Router) + TypeScript + Tailwind.

## التشغيل
```bash
npm install
npm run dev
```

## قبل النشر — عدّل هذه فقط
كل البيانات في `lib/site.ts`:
- `phone` / `phoneHref` — رقم الهاتف الحقيقي
- `whatsapp` / `whatsappHref` — رقم واتساب (بصيغة wa.me/967…)
- `addressLine` و `mapsQuery` — العنوان الدقيق
- `licenseNumber` — رقم ترخيص وزارة الصحة
- `HOURS` — ساعات الدوام الفعلية

النصوص كلها في `lib/content.ts`، وأسماء الفريق في `PHARMACISTS` (حاليًا نصوص مؤقتة).

## عن الصور
الصور الحالية (البطل، المعرض، الفريق) من Unsplash تحت [رخصة Unsplash](https://unsplash.com/license) — مجانية للاستخدام التجاري وبدون نسبة، لكنها **مؤقتة** لأنها ليست صيدليتك الفعلية.

لاستبدالها بصورك الحقيقية:
1. ضع الصور في `public/pharmacy/` و`public/team/`
2. في `components/sections/hero.tsx` غيّر `HERO_IMAGE`
3. في `lib/promo.ts` غيّر روابط `GALLERY`
4. في `lib/content.ts` غيّر روابط `image` داخل `PHARMACISTS`
5. احذف `images.remotePatterns` من `next.config.mjs` إذا لم تعد تستخدم روابط خارجية

## البنية
```
lib/site.ts        بيانات الصيدلية — المصدر الوحيد
lib/hours.ts       حساب حالة مفتوح/مغلق بتوقيت عدن
lib/content.ts     نصوص الأقسام
components/ui/     مكونات مشتركة (Section, Action, OpenStatus, HoursTable)
components/layout/ الهيدر والفوتر
components/sections/ أقسام الصفحة
```

لا تتكرر كلاسات التنسيق: كل الأزرار تمر عبر `Action`، وكل قسم عبر `Section`.
