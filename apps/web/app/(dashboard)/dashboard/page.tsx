import { Card, CardContent, CardHeader, CardTitle } from "@siteforge/ui";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Welcome back!</h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your websites and activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Websites", value: "0", change: "Create your first" },
          { title: "Published", value: "0", change: "None yet" },
          { title: "Total Views", value: "0", change: "—" },
          { title: "AI Credits", value: "10", change: "Free plan" },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-accent cursor-pointer">
            <span className="text-3xl">🤖</span>
            <span className="font-medium">Generate with AI</span>
            <span className="text-xs text-muted-foreground">
              Describe your business and let AI build your site
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-accent cursor-pointer">
            <span className="text-3xl">📐</span>
            <span className="font-medium">Choose a Template</span>
            <span className="text-xs text-muted-foreground">
              Start from a professionally designed template
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-accent cursor-pointer">
            <span className="text-3xl">✏️</span>
            <span className="font-medium">Start from Scratch</span>
            <span className="text-xs text-muted-foreground">
              Build your website with the visual editor
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
