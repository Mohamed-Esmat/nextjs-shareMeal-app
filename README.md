# 🍽️ NextJS ShareMeal App – Esmat

Welcome to **NextJS ShareMeal App** – Esmat’s community-driven meals sharing platform, powered by Next.js & Supabase! 🌐✨

---

## 🚀 Project Overview

Share delicious recipes and discover new meals from fellow food enthusiasts:

- 📖 **Browse** a gallery of community-shared meals
- 🍳 **View** step-by-step cooking instructions
- 🖼️ **Upload** and share your own meal photos & details
- 🤝 **Join** a growing community of food lovers

This application uses:

- **Next.js 15** (App Router) & **React 19**
- **SQLite** (`better-sqlite3`) for data storage
- **Supabase Storage** for user-uploaded images (500 MB free tier)
- **CSS Modules** for scoped styling
- **Netlify** for seamless deployments

---

## 🎬 Live Demo

Experience the app in action: [https://nextjs-shareMeal-app-esmat.netlify.app](https://nextjs-shareMeal-app-esmat.netlify.app)

---

## 🔧 Local Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/Mohamed-Esmat/nextjs-shareMeal-app.git
   cd nextjs-shareMeal-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a file named `.env.local` in the project root with:

   ```ini
   NEXT_PUBLIC_SUPABASE_URL=https://<YOUR_PROJECT_ID>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<YOUR_SERVICE_ROLE_KEY>
   ```

   _Keep this file private!_ 🔒

4. **Initialize and seed the database**

   ```bash
   node initdb.js
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open <http://localhost:3000> in your browser.

---

## 🌐 Supabase Storage Setup

1. Go to your Supabase Dashboard → **Storage** → **Create Bucket**
2. Name the bucket `images` and enable **Public** access
3. Use the Service Role Key for server-side uploads

---

## 📦 NPM Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Run production build
- `node initdb.js` – Create & seed SQLite DB
- `node scripts/uploadImages.js` – Bulk upload `public/images` to Supabase

---

## 🌟 Deployment to Netlify

1. Push your repository to GitHub
2. In Netlify Dashboard → **New site from Git** → connect repo
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify settings (same as `.env.local`)
5. Deploy! Netlify will auto-build on every push.

---

## 📈 Next Steps & Features

- 🔒 **User Authentication** (NextAuth + Supabase)
- ✏️ Edit & Delete shared meals
- ❤️ Like & Comment on recipes
- 🌙 Dark mode support

Contributions welcome! Feel free to open issues or submit pull requests. 🛠️

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.
