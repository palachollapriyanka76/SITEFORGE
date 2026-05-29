export default function TemplatesPage() {
  const categories = [
    "All",
    "Restaurant",
    "Portfolio",
    "E-Commerce",
    "Blog",
    "Landing Page",
    "SaaS",
    "Agency",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Choose a professionally designed template to get started quickly
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className="rounded-full border px-4 py-1.5 text-sm transition-colors hover:bg-accent first:bg-primary first:text-primary-foreground"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Modern Restaurant", category: "Restaurant", premium: false },
          { name: "Creative Portfolio", category: "Portfolio", premium: false },
          { name: "SaaS Landing Page", category: "SaaS", premium: true },
        ].map((template) => (
          <div
            key={template.name}
            className="group cursor-pointer overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="aspect-video bg-muted/50 relative">
              {template.premium && (
                <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
                  PRO
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-xs text-muted-foreground">{template.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
