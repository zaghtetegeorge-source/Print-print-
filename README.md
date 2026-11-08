# Infinity Graphic — موقع الطباعة

موقع ستاتيك (HTML واحد + صور) جاهز للرفع على **Vercel**.

```
index.html            ← الموقع كامل
img/                  ← الصور
backend/apps-script.gs← كود Google Sheets لحفظ الطلبات (ما بينرفع على Vercel)
vercel.json           ← إعدادات Vercel (كاش للصور + هيدرز أمان)
```

## ١) ربط المستودع مع Vercel
1. ادخل [vercel.com/new](https://vercel.com/new) وسجّل دخول بحساب GitHub.
2. اختار المستودع `print-print-` واضغط **Import**.
3. الإعدادات:
   - **Framework Preset:** `Other`
   - **Build Command:** فاضي
   - **Output Directory:** فاضي (أو `.`)
4. اضغط **Deploy** — بيعطيك رابط متل `https://print-print.vercel.app`.
5. كل `git push` على الفرع الرئيسي بيعمل نشر تلقائي، وكل فرع تاني بيعطي رابط Preview.
6. لربط دومين (مثلاً `infinitygraphic.ae`): Project → **Settings → Domains** → Add.

## ٢) ربط الطلبات بجدول Google (مرة وحدة)
1. افتح `sheets.new` واعمل جدول جديد، سمّيه "طلبات Infinity".
2. Extensions → **Apps Script**، امسح الكود وحط محتوى `backend/apps-script.gs`.
3. غيّر `ADMIN_KEY` لكلمة سر من عندك (هي كلمة سر لوحة الطلبات) — **لا ترفعها على GitHub**.
4. Deploy → New deployment → **Web app** — Execute as: *Me*، Who has access: *Anyone*.
5. انسخ رابط الـ Web app، وافتح `index.html` وابحث عن `const API_URL='';` وحط الرابط:
   `const API_URL='https://script.google.com/macros/s/.../exec';`
6. اعمل commit و push — Vercel بينشر التعديل لحاله.

## ٣) لوحة الطلبات
افتح رابط الموقع وزيد بآخره `#admin` (مثال: `https://print-print.vercel.app/#admin`)،
حط كلمة السر (`ADMIN_KEY`) وبتطلعلك كل الطلبات، بتغيّر حالتها، وبتحمّل فاتورة كل طلب PDF.
