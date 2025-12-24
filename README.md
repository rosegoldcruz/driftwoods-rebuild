# Driftwoods Bar & Grill - Website Rebuild

A modern, performant rebuild of the Driftwoods Bar & Grill website using Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Built with Next.js 14 App Router for optimal performance
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG 2.1 compliant with skip links, proper focus states, and semantic HTML
- **Smooth Animations**: Framer Motion for delightful user interactions
- **SEO Optimized**: Proper meta tags, semantic structure, and performance
- **TypeScript**: Full type safety throughout the codebase

## 📁 Project Structure

```
driftwoods-rebuild/
├── app/
│   ├── layout.tsx      # Root layout with Navbar/Footer
│   ├── page.tsx        # Homepage
│   ├── globals.css     # Global styles & Tailwind
│   ├── about/          # About page
│   ├── menu/           # Menu page
│   ├── careers/        # Careers page
│   ├── contact/        # Contact page
│   └── order/          # Order online page
├── components/
│   ├── Navbar.tsx      # Sticky navigation with mobile menu
│   ├── Footer.tsx      # Site footer with contact info
│   ├── Hero.tsx        # Video hero section
│   ├── AboutSection.tsx    # About preview section
│   ├── NewsletterForm.tsx  # Email signup form
│   └── FoodGallery.tsx     # Food image gallery with lightbox
├── public/             # Static assets
├── tailwind.config.js  # Custom theme configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🎨 Design System

### Colors
- **Primary (Orange)**: `#DC6B26` - Brand accent color
- **Dark (Navy)**: `#1A212F` - Background and text
- **Cream**: `#EDE6DF` - Light backgrounds
- **Accent (Gold)**: `#C9A84C` - Highlights

### Typography
- **Body**: System fonts with Poppins-style feel
- **Headings**: Bold, impactful hierarchy

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd driftwoods-rebuild
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, about preview, gallery, newsletter |
| About | `/about` | Company story and values |
| Menu | `/menu` | Full food and drink menu |
| Careers | `/careers` | Job listings and benefits |
| Contact | `/contact` | Contact form, hours, location |
| Order | `/order` | Online ordering options |

## ✅ Improvements Over Original

- **Performance**: Lazy loading, optimized images, code splitting
- **Accessibility**: Skip links, focus management, ARIA labels
- **Mobile UX**: Touch-friendly navigation, responsive layouts
- **SEO**: Proper meta tags, semantic HTML, structured data
- **Code Quality**: TypeScript, component architecture, clean separation of concerns
- **Animations**: Smooth scroll-triggered animations with Framer Motion
- **Forms**: Client-side validation, loading states, success feedback

## 📄 License

This project is a rebuild for Driftwoods Bar & Grill.

---

Built with ❤️ for the Sunnyslope community
