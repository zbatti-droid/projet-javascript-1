# متجر أناقة — مشروع Full Stack

متجر فساتين عربي متكامل مكوّن من واجهة React وواجهة API آمنة وقاعدة بيانات PostgreSQL. لم يعد المشروع يعتمد على JSON Server.

## التقنيات

- Frontend: React، TypeScript، Vite، Tailwind CSS، Redux Toolkit
- Backend: Node.js، Express، TypeScript، Prisma
- Database: PostgreSQL
- Authentication: JWT داخل Cookie من نوع HttpOnly وكلمات مرور مشفرة بـ bcrypt

## هيكلة المشروع

```text
fashion-fullstack/
├── frontend/        واجهة المتجر
├── backend/         API والمصادقة ومنطق الطلبات
├── docker-compose.yml
├── package.json     أوامر تشغيل المشروع كاملاً
└── README.md
```

## التشغيل على Windows

المتطلبات: Node.js 20 أو أحدث وDocker Desktop.

افتح PowerShell داخل مجلد المشروع ونفّذ:

```powershell
npm install
Copy-Item backend\.env.example backend\.env
docker compose up -d
npm run db:deploy
npm run db:seed
npm run dev
```

بعد ذلك افتح:

- المتجر: http://localhost:5173
- فحص الـAPI: http://localhost:3000/api/health

يجب إبقاء نافذة `npm run dev` مفتوحة. لا تشغّل `json-server` بعد الآن.

## إعداد ملف البيئة

عدّل `backend/.env` قبل النشر، وغيّر `JWT_SECRET` إلى قيمة سرية طويلة. إعدادات Docker المحلية الجاهزة موجودة في `.env.example`.

لإنشاء حساب مدير، ضع القيمتين التاليتين قبل تشغيل seed:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
```

ثم نفّذ `npm run db:seed`.

## أهم مسارات API

| Method | Endpoint | الوظيفة |
|---|---|---|
| GET | `/api/products` | عرض المنتجات |
| GET | `/api/products/:id` | عرض منتج |
| POST | `/api/auth/register` | إنشاء حساب |
| POST | `/api/auth/login` | تسجيل الدخول |
| GET | `/api/auth/me` | المستخدم الحالي |
| POST | `/api/auth/logout` | تسجيل الخروج |
| PUT | `/api/users/me` | تعديل الحساب |
| POST | `/api/orders` | إنشاء طلب والتحقق من السعر والمخزون |
| GET | `/api/orders/my` | طلبات المستخدم الحالي |
| GET | `/api/orders/:id` | تفاصيل طلب يملكه المستخدم |

إضافة المنتجات وتعديلها وحذفها محمية بصلاحية `ADMIN`.

## النشر

- ارفع `frontend` إلى خدمة استضافة واجهات، واضبط `VITE_API_URL` على رابط الـBackend متبوعاً بـ `/api`.
- ارفع `backend` إلى خدمة Node.js، واضبط `DATABASE_URL` و`JWT_SECRET` و`FRONTEND_URL`.
- استخدم قاعدة PostgreSQL مُدارة، ثم شغّل `npm run db:deploy` و`npm run db:seed`.
- في الإنتاج يجب أن يكون كل من الواجهة والـBackend على HTTPS حتى تعمل Cookie الآمنة.

## الحماية المضافة

- لا تُرجع API كلمة المرور إلى الواجهة.
- الخادم يعيد حساب أسعار الطلب ولا يثق في السعر المرسل من المتصفح.
- المخزون يُحدّث داخل Transaction لتقليل طلب كميات غير متوفرة.
- توجد حماية Helmet وCORS وRate Limiting والتحقق من المدخلات بـ Zod.
