# Bhakti Bhandar — Admin Panel

Admin panel frontend for Bhakti Bhandar, built with **React + Vite + TypeScript + Tailwind CSS**, using **dummy/mock data** (no backend yet — this is the UI layer only, ready to wire up to your Node/Express + MongoDB API later).

## Getting started

This project's dependencies could not be installed in the environment it was built in (no network access), so you'll need to install them yourself:

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

> Login page accepts any input — it's a UI mock with a simulated sign-in delay, not real authentication yet.

## What's included

- **Dashboard** — stat cards, monthly revenue chart (Recharts), recent orders, top selling products, quick actions
- **Products** — searchable/filterable table, pagination, bulk select + delete, add/edit modal with images, variants, MRP/price/discount/GST/stock, bulk import/export buttons (UI only)
- **Categories** — grid view with icon, banner, sub-categories, add/edit modal
- **Orders** — list with filters, detail page with status flow (Pending → Confirmed → Packed → Shipped → Delivered), cancel/return actions, print invoice, UPI payment verification panel
- **Customers** — list with search, order stats, block/unblock
- **Banners** — homepage slider / offer / festival / popup banners, active toggle
- **Coupons** — flat & percentage discounts, expiry, usage limits
- **Reviews** — pending/approved/rejected tabs, approve/reject/reply
- **Notifications** — compose + sent history (offer/order/general)
- **Reports** — sales, product, customer, GST tabs with export buttons (UI only)
- **UPI Payments** — set your UPI ID/QR, review & verify/reject pending payments (UTR + screenshot)
- **Website / Delivery / General Settings** — branding, contact, social links, policies, delivery charges, GST, business hours, SEO
- **Security** — JWT/hashing status cards, activity log table, backup trigger

Dark mode is the default (matching the storefront's look) with a light mode toggle in the top bar. Fully responsive down to mobile.

## Next steps (not built yet)

- Wire up to a real Node/Express + MongoDB backend (all data currently lives in `src/data/*.ts`)
- Real image/video upload to Cloudinary (upload buttons are currently placeholders)
- Real JWT-based auth on the Login page
- Real Excel/PDF export and bulk import parsing
- Connect the "Bulk Import Excel" and "Export" buttons to actual file handling

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS (custom design tokens matching the Bhakti Bhandar brand palette)
- react-router-dom, recharts, lucide-react
