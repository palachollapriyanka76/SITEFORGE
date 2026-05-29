import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@siteforge/ui";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-orange-500">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <span className="font-display text-lg font-bold">Admin</span>
        </div>
        <nav className="space-y-1 p-4">
          {[
            { label: "Overview", href: "/", icon: "📊" },
            { label: "Users", href: "/users", icon: "👥" },
            { label: "Websites", href: "/websites", icon: "🌐" },
            { label: "Templates", href: "/templates", icon: "📐" },
            { label: "AI Jobs", href: "/ai-jobs", icon: "🤖" },
            { label: "Subscriptions", href: "/subscriptions", icon: "💳" },
            { label: "System Logs", href: "/logs", icon: "📋" },
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

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="font-display text-lg font-semibold">Admin Overview</h1>
          <UserButton afterSignOutUrl="/" />
        </header>

        <main className="flex-1 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Total Users", value: "0" },
              { title: "Active Websites", value: "0" },
              { title: "AI Jobs Today", value: "0" },
              { title: "Revenue (MRR)", value: "$0" },
            ].map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
