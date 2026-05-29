import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-card lg:block">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-400">
            <span className="text-lg font-bold text-white">S</span>
          </div>
          <span className="font-display text-lg font-bold">SiteForge</span>
        </div>

        <nav className="space-y-1 p-4">
          {[
            { label: "Dashboard", href: "/dashboard", icon: "📊" },
            { label: "My Websites", href: "/dashboard/websites", icon: "🌐" },
            { label: "Templates", href: "/dashboard/templates", icon: "📐" },
            { label: "AI Assistant", href: "/dashboard/ai", icon: "🤖" },
            { label: "Media Library", href: "/dashboard/media", icon: "🖼️" },
            { label: "Settings", href: "/settings", icon: "⚙️" },
            { label: "Billing", href: "/billing", icon: "💳" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
          <h2 className="font-display text-lg font-semibold">Dashboard</h2>
          <UserButton afterSignOutUrl="/" />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
