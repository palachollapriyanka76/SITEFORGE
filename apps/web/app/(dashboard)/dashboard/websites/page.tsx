import { Button } from "@siteforge/ui";
import Link from "next/link";

export default function WebsitesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">My Websites</h1>
          <p className="text-sm text-muted-foreground">
            Manage and edit your websites
          </p>
        </div>
        <Link href="/dashboard/websites/new">
          <Button variant="gradient">+ New Website</Button>
        </Link>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-16 text-center">
        <span className="text-5xl">🌐</span>
        <h3 className="mt-4 font-display text-lg font-semibold">
          No websites yet
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Create your first website using AI, a template, or start from scratch.
        </p>
        <Link href="/dashboard/websites/new" className="mt-6">
          <Button variant="gradient">Create Your First Website</Button>
        </Link>
      </div>
    </div>
  );
}
