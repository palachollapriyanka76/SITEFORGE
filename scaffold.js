const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const folders = [
  // public folders
  'frontend/public/images/hero',
  'frontend/public/images/banners',
  'frontend/public/images/products',
  'frontend/public/images/testimonials',
  'frontend/public/images/categories',
  'frontend/public/icons',
  'frontend/public/videos',
  'frontend/public/animations',
  'frontend/public/logos',
  'frontend/public/fonts',

  // app routing empty/placeholder page directories if any
  'frontend/src/app/features',
  'frontend/src/app/pricing',
  'frontend/src/app/showcase',
  'frontend/src/app/contact',
  'frontend/src/app/about',

  // component empty folders
  'frontend/src/components/footer',
  'frontend/src/components/cards',
  'frontend/src/components/buttons',
  'frontend/src/components/forms',
  'frontend/src/components/modals',
  'frontend/src/components/loaders',
  'frontend/src/components/animations',
  'frontend/src/components/showcase',
  'frontend/src/components/testimonials',

  // backend folders
  'backend/src/controllers',
  'backend/src/routes',
  'backend/src/models',
  'backend/src/middleware',
  'backend/src/services',
  'backend/src/ai-engine',
  'backend/src/uploads',
  'backend/src/utils',
  'backend/src/config',

  // database folders
  'database/schemas',
  'database/migrations',
  'database/seeders',
  'database/backups',

  // docs folders
  'docs/api-documentation',
  'docs/architecture',
  'docs/screenshots',
  'docs/project-report',
  'docs/presentation',

  // deployment folders
  'deployment/docker',
  'deployment/vercel',
  'deployment/render',
  'deployment/nginx',
  'deployment/ci-cd',

  // assets folders
  'assets/logos',
  'assets/mockups',
  'assets/figma-designs',
  'assets/presentations'
];

const files = {
  // Main Root Files
  'README.md': `# SiteForge\n\nAI-Powered Website Builder & SaaS Platform.\n\n## Structure\n\n- **frontend/**: Next.js frontend application.\n- **backend/**: Express/NodeJS backend application.\n- **database/**: Database schemas, migrations, and seeders.\n- **docs/**: Project documentation.\n- **deployment/**: Deployment configurations (Docker, Nginx, CI/CD).\n- **assets/**: Design assets, logos, and mockups.\n`,
  
  '.gitignore': `# dependencies\n/node_modules\n/.pnp\n.pnp.js\n\n# testing\n/coverage\n\n# next.js\n/.next/\n/out/\n\n# production\n/build\n\n# misc\n.DS_Store\n*.pem\n\n# debug\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# local env files\n.env*.local\n\n# vercel\n.vercel\n\n# typescript\n*.tsbuildinfo\nnext-env.d.ts\n`,
  
  'docker-compose.yml': `version: '3.8'\n\nservices:\n  frontend:\n    build:\n      context: ./frontend\n      dockerfile: Dockerfile\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=development\n    volumes:\n      - ./frontend:/app\n      - /app/node_modules\n\n  backend:\n    build:\n      context: ./backend\n      dockerfile: Dockerfile\n    ports:\n      - "5000:5000"\n    environment:\n      - NODE_ENV=development\n    volumes:\n      - ./backend:/app\n      - /app/node_modules\n`,
  
  'LICENSE': `MIT License\n\nCopyright (c) 2026 SiteForge\n`,

  // Frontend Root Files
  'frontend/package.json': JSON.stringify({
    name: "siteforge-frontend",
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      next: "^14.0.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0"
    },
    devDependencies: {
      tailwindcss: "^3.3.0",
      postcss: "^8.4.0",
      autoprefixer: "^10.4.0"
    }
  }, null, 2),

  'frontend/next.config.js': `/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  reactStrictMode: true,\n};\n\nmodule.exports = nextConfig;\n`,
  
  'frontend/tailwind.config.js': `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",\n    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",\n    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}\n`,
  
  'frontend/.env': `NEXT_PUBLIC_API_URL=http://localhost:5000/api\n`,

  // Frontend App Pages
  'frontend/src/app/page.jsx': `import React from 'react';\n\nexport default function Home() {\n  return (\n    <main className="flex min-h-screen flex-col items-center justify-center p-24">\n      <h1 className="text-4xl font-bold mb-4">Welcome to SiteForge</h1>\n      <p className="text-xl">AI-Powered Website Builder</p>\n    </main>\n  );\n}\n`,

  'frontend/src/app/layout.jsx': `import React from 'react';\nimport '../styles/globals.css';\n\nexport const metadata = {\n  title: 'SiteForge',\n  description: 'AI-Powered Website Builder',\n};\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}\n`,

  'frontend/src/app/loading.jsx': `import React from 'react';\n\nexport default function Loading() {\n  return (\n    <div className="flex min-h-screen items-center justify-center">\n      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>\n    </div>\n  );\n}\n`,

  'frontend/src/app/not-found.jsx': `import React from 'react';\nimport Link from 'next/link';\n\nexport default function NotFound() {\n  return (\n    <div className="flex min-h-screen flex-col items-center justify-center p-24">\n      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>\n      <p className="mb-4">Could not find requested resource</p>\n      <Link href="/" className="text-blue-500 hover:underline">Return Home</Link>\n    </div>\n  );\n}\n`,

  // Auth pages
  'frontend/src/app/auth/login/page.jsx': `import React from 'react';\n\nexport default function LoginPage() {\n  return <div className="p-8"><h1>Login</h1></div>;\n}\n`,
  'frontend/src/app/auth/signup/page.jsx': `import React from 'react';\n\nexport default function SignupPage() {\n  return <div className="p-8"><h1>Sign Up</h1></div>;\n}\n`,
  'frontend/src/app/auth/forgot-password/page.jsx': `import React from 'react';\n\nexport default function ForgotPasswordPage() {\n  return <div className="p-8"><h1>Forgot Password</h1></div>;\n}\n`,
  'frontend/src/app/auth/role-selection/page.jsx': `import React from 'react';\n\nexport default function RoleSelectionPage() {\n  return <div className="p-8"><h1>Role Selection</h1></div>;\n}\n`,

  // Vendor pages
  'frontend/src/app/vendor/dashboard/page.jsx': `import React from 'react';\n\nexport default function VendorDashboard() {\n  return <div className="p-8"><h1>Vendor Dashboard</h1></div>;\n}\n`,
  'frontend/src/app/vendor/ai-generator/page.jsx': `import React from 'react';\n\nexport default function AIGenerator() {\n  return <div className="p-8"><h1>AI Website Generator</h1></div>;\n}\n`,
  'frontend/src/app/vendor/website-builder/page.jsx': `import React from 'react';\n\nexport default function WebsiteBuilder() {\n  return <div className="p-8"><h1>Website Builder</h1></div>;\n}\n`,
  'frontend/src/app/vendor/products/page.jsx': `import React from 'react';\n\nexport default function ProductsPage() {\n  return <div className="p-8"><h1>Products</h1></div>;\n}\n`,
  'frontend/src/app/vendor/products/add-product/page.jsx': `import React from 'react';\n\nexport default function AddProductPage() {\n  return <div className="p-8"><h1>Add Product</h1></div>;\n}\n`,
  'frontend/src/app/vendor/products/edit-product/page.jsx': `import React from 'react';\n\nexport default function EditProductPage() {\n  return <div className="p-8"><h1>Edit Product</h1></div>;\n}\n`,
  'frontend/src/app/vendor/products/categories/page.jsx': `import React from 'react';\n\nexport default function ProductCategoriesPage() {\n  return <div className="p-8"><h1>Product Categories</h1></div>;\n}\n`,
  'frontend/src/app/vendor/analytics/page.jsx': `import React from 'react';\n\nexport default function VendorAnalytics() {\n  return <div className="p-8"><h1>Vendor Analytics</h1></div>;\n}\n`,
  'frontend/src/app/vendor/orders/page.jsx': `import React from 'react';\n\nexport default function VendorOrders() {\n  return <div className="p-8"><h1>Orders</h1></div>;\n}\n`,
  'frontend/src/app/vendor/customers/page.jsx': `import React from 'react';\n\nexport default function VendorCustomers() {\n  return <div className="p-8"><h1>Customers</h1></div>;\n}\n`,
  'frontend/src/app/vendor/publish/page.jsx': `import React from 'react';\n\nexport default function PublishPage() {\n  return <div className="p-8"><h1>Publish Website</h1></div>;\n}\n`,
  'frontend/src/app/vendor/themes/page.jsx': `import React from 'react';\n\nexport default function ThemesPage() {\n  return <div className="p-8"><h1>Themes</h1></div>;\n}\n`,
  'frontend/src/app/vendor/settings/page.jsx': `import React from 'react';\n\nexport default function VendorSettings() {\n  return <div className="p-8"><h1>Vendor Settings</h1></div>;\n}\n`,
  'frontend/src/app/vendor/ai-assistant/page.jsx': `import React from 'react';\n\nexport default function AIAssistant() {\n  return <div className="p-8"><h1>AI Assistant</h1></div>;\n}\n`,

  // Admin pages
  'frontend/src/app/admin/dashboard/page.jsx': `import React from 'react';\n\nexport default function AdminDashboard() {\n  return <div className="p-8"><h1>Admin Dashboard</h1></div>;\n}\n`,
  'frontend/src/app/admin/vendors/page.jsx': `import React from 'react';\n\nexport default function AdminVendors() {\n  return <div className="p-8"><h1>Manage Vendors</h1></div>;\n}\n`,
  'frontend/src/app/admin/websites/page.jsx': `import React from 'react';\n\nexport default function AdminWebsites() {\n  return <div className="p-8"><h1>Manage Websites</h1></div>;\n}\n`,
  'frontend/src/app/admin/analytics/page.jsx': `import React from 'react';\n\nexport default function AdminAnalytics() {\n  return <div className="p-8"><h1>Admin Analytics</h1></div>;\n}\n`,
  'frontend/src/app/admin/reports/page.jsx': `import React from 'react';\n\nexport default function AdminReports() {\n  return <div className="p-8"><h1>Admin Reports</h1></div>;\n}\n`,
  'frontend/src/app/admin/ai-monitoring/page.jsx': `import React from 'react';\n\nexport default function AIMonitoring() {\n  return <div className="p-8"><h1>AI Monitoring</h1></div>;\n}\n`,
  'frontend/src/app/admin/security/page.jsx': `import React from 'react';\n\nexport default function AdminSecurity() {\n  return <div className="p-8"><h1>Security Settings</h1></div>;\n}\n`,
  'frontend/src/app/admin/settings/page.jsx': `import React from 'react';\n\nexport default function AdminSettings() {\n  return <div className="p-8"><h1>Admin Settings</h1></div>;\n}\n`,

  // Route groups/pages
  'frontend/src/app/features/page.jsx': `import React from 'react';\n\nexport default function FeaturesPage() {\n  return <div className="p-8"><h1>Features</h1></div>;\n}\n`,
  'frontend/src/app/pricing/page.jsx': `import React from 'react';\n\nexport default function PricingPage() {\n  return <div className="p-8"><h1>Pricing</h1></div>;\n}\n`,
  'frontend/src/app/showcase/page.jsx': `import React from 'react';\n\nexport default function ShowcasePage() {\n  return <div className="p-8"><h1>Showcase</h1></div>;\n}\n`,
  'frontend/src/app/contact/page.jsx': `import React from 'react';\n\nexport default function ContactPage() {\n  return <div className="p-8"><h1>Contact Us</h1></div>;\n}\n`,
  'frontend/src/app/about/page.jsx': `import React from 'react';\n\nexport default function AboutPage() {\n  return <div className="p-8"><h1>About Us</h1></div>;\n}\n`,

  // Components - navbar
  'frontend/src/components/navbar/Navbar.jsx': `import React from 'react';\n\nexport default function Navbar() {\n  return <nav>Navbar</nav>;\n}\n`,
  'frontend/src/components/navbar/MobileNavbar.jsx': `import React from 'react';\n\nexport default function MobileNavbar() {\n  return <div>Mobile Navbar</div>;\n}\n`,
  'frontend/src/components/navbar/Sidebar.jsx': `import React from 'react';\n\nexport default function Sidebar() {\n  return <aside>Sidebar</aside>;\n}\n`,

  // Components - hero
  'frontend/src/components/hero/HeroSection.jsx': `import React from 'react';\n\nexport default function HeroSection() {\n  return <section>Hero Section</section>;\n}\n`,
  'frontend/src/components/hero/HeroContent.jsx': `import React from 'react';\n\nexport default function HeroContent() {\n  return <div>Hero Content</div>;\n}\n`,
  'frontend/src/components/hero/HeroAnimation.jsx': `import React from 'react';\n\nexport default function HeroAnimation() {\n  return <div>Hero Animation</div>;\n}\n`,
  'frontend/src/components/hero/HeroButtons.jsx': `import React from 'react';\n\nexport default function HeroButtons() {\n  return <div>Hero Buttons</div>;\n}\n`,

  // Components - ai
  'frontend/src/components/ai/AIChat.jsx': `import React from 'react';\n\nexport default function AIChat() {\n  return <div>AI Chat</div>;\n}\n`,
  'frontend/src/components/ai/AIGenerator.jsx': `import React from 'react';\n\nexport default function AIGenerator() {\n  return <div>AI Generator</div>;\n}\n`,
  'frontend/src/components/ai/AIRecommendation.jsx': `import React from 'react';\n\nexport default function AIRecommendation() {\n  return <div>AI Recommendation</div>;\n}\n`,
  'frontend/src/components/ai/AIThemeGenerator.jsx': `import React from 'react';\n\nexport default function AIThemeGenerator() {\n  return <div>AI Theme Generator</div>;\n}\n`,
  'frontend/src/components/ai/AIAnimationGenerator.jsx': `import React from 'react';\n\nexport default function AIAnimationGenerator() {\n  return <div>AI Animation Generator</div>;\n}\n`,
  'frontend/src/components/ai/AIWebsitePreview.jsx': `import React from 'react';\n\nexport default function AIWebsitePreview() {\n  return <div>AI Website Preview</div>;\n}\n`,

  // Components - vendor
  'frontend/src/components/vendor/VendorSidebar.jsx': `import React from 'react';\n\nexport default function VendorSidebar() {\n  return <aside>Vendor Sidebar</aside>;\n}\n`,
  'frontend/src/components/vendor/VendorHeader.jsx': `import React from 'react';\n\nexport default function VendorHeader() {\n  return <header>Vendor Header</header>;\n}\n`,
  'frontend/src/components/vendor/VendorStats.jsx': `import React from 'react';\n\nexport default function VendorStats() {\n  return <div>Vendor Stats</div>;\n}\n`,
  'frontend/src/components/vendor/VendorCards.jsx': `import React from 'react';\n\nexport default function VendorCards() {\n  return <div>Vendor Cards</div>;\n}\n`,
  'frontend/src/components/vendor/VendorAnalytics.jsx': `import React from 'react';\n\nexport default function VendorAnalytics() {\n  return <div>Vendor Analytics</div>;\n}\n`,

  // Components - admin
  'frontend/src/components/admin/AdminSidebar.jsx': `import React from 'react';\n\nexport default function AdminSidebar() {\n  return <aside>Admin Sidebar</aside>;\n}\n`,
  'frontend/src/components/admin/AdminHeader.jsx': `import React from 'react';\n\nexport default function AdminHeader() {\n  return <header>Admin Header</header>;\n}\n`,
  'frontend/src/components/admin/AdminCharts.jsx': `import React from 'react';\n\nexport default function AdminCharts() {\n  return <div>Admin Charts</div>;\n}\n`,
  'frontend/src/components/admin/AdminTables.jsx': `import React from 'react';\n\nexport default function AdminTables() {\n  return <div>Admin Tables</div>;\n}\n`,
  'frontend/src/components/admin/AdminReports.jsx': `import React from 'react';\n\nexport default function AdminReports() {\n  return <div>Admin Reports</div>;\n}\n`,

  // Components - editor
  'frontend/src/components/editor/WebsiteEditor.jsx': `import React from 'react';\n\nexport default function WebsiteEditor() {\n  return <div>Website Editor</div>;\n}\n`,
  'frontend/src/components/editor/LivePreview.jsx': `import React from 'react';\n\nexport default function LivePreview() {\n  return <div>Live Preview</div>;\n}\n`,
  'frontend/src/components/editor/ComponentToolbar.jsx': `import React from 'react';\n\nexport default function ComponentToolbar() {\n  return <div>Component Toolbar</div>;\n}\n`,
  'frontend/src/components/editor/AnimationPanel.jsx': `import React from 'react';\n\nexport default function AnimationPanel() {\n  return <div>Animation Panel</div>;\n}\n`,
  'frontend/src/components/editor/TypographyPanel.jsx': `import React from 'react';\n\nexport default function TypographyPanel() {\n  return <div>Typography Panel</div>;\n}\n`,
  'frontend/src/components/editor/LayoutPanel.jsx': `import React from 'react';\n\nexport default function LayoutPanel() {\n  return <div>Layout Panel</div>;\n}\n`,
  'frontend/src/components/editor/ThemePanel.jsx': `import React from 'react';\n\nexport default function ThemePanel() {\n  return <div>Theme Panel</div>;\n}\n`,
  'frontend/src/components/editor/ColorPicker.jsx': `import React from 'react';\n\nexport default function ColorPicker() {\n  return <div>Color Picker</div>;\n}\n`,

  // Components - products
  'frontend/src/components/products/ProductCard.jsx': `import React from 'react';\n\nexport default function ProductCard() {\n  return <div>Product Card</div>;\n}\n`,
  'frontend/src/components/products/ProductGrid.jsx': `import React from 'react';\n\nexport default function ProductGrid() {\n  return <div>Product Grid</div>;\n}\n`,
  'frontend/src/components/products/ProductForm.jsx': `import React from 'react';\n\nexport default function ProductForm() {\n  return <div>Product Form</div>;\n}\n`,
  'frontend/src/components/products/ProductPreview.jsx': `import React from 'react';\n\nexport default function ProductPreview() {\n  return <div>Product Preview</div>;\n}\n`,
  'frontend/src/components/products/ProductCategory.jsx': `import React from 'react';\n\nexport default function ProductCategory() {\n  return <div>Product Category</div>;\n}\n`,

  // Components - analytics
  'frontend/src/components/analytics/RevenueChart.jsx': `import React from 'react';\n\nexport default function RevenueChart() {\n  return <div>Revenue Chart</div>;\n}\n`,
  'frontend/src/components/analytics/VisitorsChart.jsx': `import React from 'react';\n\nexport default function VisitorsChart() {\n  return <div>Visitors Chart</div>;\n}\n`,
  'frontend/src/components/analytics/SalesChart.jsx': `import React from 'react';\n\nexport default function SalesChart() {\n  return <div>Sales Chart</div>;\n}\n`,
  'frontend/src/components/analytics/OrdersOverview.jsx': `import React from 'react';\n\nexport default function OrdersOverview() {\n  return <div>Orders Overview</div>;\n}\n`,

  // Layouts
  'frontend/src/layouts/MainLayout.jsx': `import React from 'react';\n\nexport default function MainLayout({ children }) {\n  return <div>{children}</div>;\n}\n`,
  'frontend/src/layouts/VendorLayout.jsx': `import React from 'react';\n\nexport default function VendorLayout({ children }) {\n  return <div>{children}</div>;\n}\n`,
  'frontend/src/layouts/AdminLayout.jsx': `import React from 'react';\n\nexport default function AdminLayout({ children }) {\n  return <div>{children}</div>;\n}\n`,

  // Hooks
  'frontend/src/hooks/useAuth.js': `import { useContext } from 'react';\nimport { AuthContext } from '../context/AuthContext';\n\nexport function useAuth() {\n  return useContext(AuthContext);\n}\n`,
  'frontend/src/hooks/useVendor.js': `import { useContext } from 'react';\nimport { VendorContext } from '../context/VendorContext';\n\nexport function useVendor() {\n  return useContext(VendorContext);\n}\n`,
  'frontend/src/hooks/useAdmin.js': `export function useAdmin() {\n  return { isAdmin: false };\n}\n`,
  'frontend/src/hooks/useAI.js': `import { useContext } from 'react';\nimport { AIContext } from '../context/AIContext';\n\nexport function useAI() {\n  return useContext(AIContext);\n}\n`,
  'frontend/src/hooks/useTheme.js': `import { useContext } from 'react';\nimport { ThemeContext } from '../context/ThemeContext';\n\nexport function useTheme() {\n  return useContext(ThemeContext);\n}\n`,

  // Contexts
  'frontend/src/context/AuthContext.jsx': `import React, { createContext, useState } from 'react';\n\nexport const AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  return (\n    <AuthContext.Provider value={{ user, setUser }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n`,
  'frontend/src/context/VendorContext.jsx': `import React, { createContext, useState } from 'react';\n\nexport const VendorContext = createContext(null);\n\nexport function VendorProvider({ children }) {\n  const [vendorData, setVendorData] = useState(null);\n  return (\n    <VendorContext.Provider value={{ vendorData, setVendorData }}>\n      {children}\n    </VendorContext.Provider>\n  );\n}\n`,
  'frontend/src/context/ThemeContext.jsx': `import React, { createContext, useState } from 'react';\n\nexport const ThemeContext = createContext(null);\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('dark');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n`,
  'frontend/src/context/AIContext.jsx': `import React, { createContext, useState } from 'react';\n\nexport const AIContext = createContext(null);\n\nexport function AIProvider({ children }) {\n  const [aiState, setAiState] = useState(null);\n  return (\n    <AIContext.Provider value={{ aiState, setAiState }}>\n      {children}\n    </AIContext.Provider>\n  );\n}\n`,

  // Services
  'frontend/src/services/api.js': `import axios from 'axios';\n\nconst api = axios.create({\n  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',\n});\n\nexport default api;\n`,
  'frontend/src/services/authService.js': `import api from './api';\n\nexport const authService = {\n  login: async (credentials) => {\n    const response = await api.post('/auth/login', credentials);\n    return response.data;\n  },\n};\n`,
  'frontend/src/services/aiService.js': `import api from './api';\n\nexport const aiService = {\n  generateWebsite: async (prompt) => {\n    const response = await api.post('/ai/generate', { prompt });\n    return response.data;\n  },\n};\n`,
  'frontend/src/services/productService.js': `import api from './api';\n\nexport const productService = {\n  getProducts: async () => {\n    const response = await api.get('/products');\n    return response.data;\n  },\n};\n`,
  'frontend/src/services/analyticsService.js': `import api from './api';\n\nexport const analyticsService = {\n  getStats: async () => {\n    const response = await api.get('/analytics');\n    return response.data;\n  },\n};\n`,
  'frontend/src/services/publishService.js': `import api from './api';\n\nexport const publishService = {\n  publish: async (siteId) => {\n    const response = await api.post(\`/publish/\${siteId}\`);\n    return response.data;\n  },\n};\n`,
  'frontend/src/services/websiteService.js': `import api from './api';\n\nexport const websiteService = {\n  getWebsites: async () => {\n    const response = await api.get('/websites');\n    return response.data;\n  },\n};\n`,

  // Styles
  'frontend/src/styles/globals.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n  --foreground-rgb: 255, 255, 255;\n  --background-start-rgb: 0, 0, 0;\n  --background-end-rgb: 0, 0, 0;\n}\n\nbody {\n  color: rgb(var(--foreground-rgb));\n  background: linear-gradient(\n      to bottom,\n      transparent,\n      rgb(var(--background-end-rgb))\n    )\n    rgb(var(--background-start-rgb));\n}\n`,
  'frontend/src/styles/themes.css': `/* Custom theme variables */\n.theme-light {\n  --bg-primary: #ffffff;\n  --text-primary: #1a1a1a;\n}\n\n.theme-dark {\n  --bg-primary: #121212;\n  --text-primary: #ffffff;\n}\n`,
  'frontend/src/styles/animations.css': `/* Custom micro-animations */\n@keyframes pulse-subtle {\n  0%, 100% { opacity: 1; }\n  50% { opacity: .8; }\n}\n\n.animate-pulse-subtle {\n  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n}\n`,
  'frontend/src/styles/responsive.css': `/* Responsive styling overrides */\n@media (max-width: 640px) {\n  .mobile-adjust {\n    padding: 1rem;\n  }\n}\n`,

  // Utils
  'frontend/src/utils/helpers.js': `export const formatCurrency = (value) => {\n  return new Intl.NumberFormat('en-US', {\n    style: 'currency',\n    currency: 'USD',\n  }).format(value);\n};\n`,
  'frontend/src/utils/constants.js': `export const API_ROUTES = {\n  LOGIN: '/auth/login',\n  REGISTER: '/auth/register',\n};\n`,
  'frontend/src/utils/validators.js': `export const validateEmail = (email) => {\n  const re = /\\S+@\\S+\\.\\S+/;\n  return re.test(email);\n};\n`,
  'frontend/src/utils/permissions.js': `export const hasPermission = (user, permission) => {\n  return user?.permissions?.includes(permission) || false;\n};\n`,
  'frontend/src/utils/animations.js': `export const slideIn = {\n  hidden: { x: -100, opacity: 0 },\n  visible: { x: 0, opacity: 1 },\n};\n`,

  // Config
  'frontend/src/config/siteConfig.js': `export const siteConfig = {\n  name: 'SiteForge',\n  description: 'AI-Powered Website Builder & SaaS Platform',\n};\n`,

  // Backend files
  'backend/.env': `PORT=5000\nMONGODB_URI=mongodb://localhost:27017/siteforge\nJWT_SECRET=your_jwt_secret_key_here\n`,
  'backend/package.json': JSON.stringify({
    name: "siteforge-backend",
    version: "1.0.0",
    main: "src/server.js",
    scripts: {
      start: "node src/server.js",
      dev: "nodemon src/server.js"
    },
    dependencies: {
      express: "^4.18.2",
      cors: "^2.8.5",
      dotenv: "^16.3.1"
    },
    devDependencies: {
      nodemon: "^3.0.1"
    }
  }, null, 2),
  
  'backend/src/server.js': `const express = require('express');\nconst cors = require('cors');\nrequire('dotenv').config();\n\nconst app = express();\nconst PORT = process.env.PORT || 5000;\n\napp.use(cors());\napp.use(express.json());\n\napp.get('/health', (req, res) => {\n  res.json({ status: 'OK', uptime: process.uptime() });\n});\n\napp.listen(PORT, () => {\n  console.log(\`Server is running on port \${PORT}\`);\n});\n`
};

console.log('Starting scaffolding of SiteForge project...');

// Create directories first
folders.forEach(folder => {
  const fullPath = path.join(rootDir, folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${folder}`);
  }
  // Create .gitkeep in empty folders to track them in git
  const gitkeepPath = path.join(fullPath, '.gitkeep');
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '');
  }
});

// Create files
Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(rootDir, filePath);
  const dirPath = path.dirname(fullPath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${path.relative(rootDir, dirPath)}`);
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`Created file: ${filePath}`);
});

console.log('Scaffolding complete!');
