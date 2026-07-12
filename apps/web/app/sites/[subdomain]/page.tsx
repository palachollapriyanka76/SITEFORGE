import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/editor/SectionRenderer";
import { HeaderSection } from "@/components/editor/sections/HeaderSection";
import { WebsiteJSON } from "@siteforge/types";

// Mock DB Fetch
async function getPublishedSiteData(subdomain: string): Promise<WebsiteJSON | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // If subdomain is completely invalid, return null to trigger 404
  if (subdomain === "not-found") return null;

  // Return a mock WebsiteJSON for demonstration
  return {
    meta: {
      title: `Published Site - ${subdomain}`,
      description: `Welcome to the official website of ${subdomain}.`,
      favicon: "",
      keywords: ["business", subdomain, "local"]
    },
    theme: {
      primaryColor: "#0f172a",
      secondaryColor: "#334155",
      accentColor: "#3b82f6",
      fontFamily: "Inter",
      style: "modern"
    },
    globalSettings: {
      navbarStyle: "default",
      footerStyle: "default",
      whatsappButton: true,
      whatsappNumber: "+1234567890"
    },
    pages: [
      {
        name: "Home",
        slug: "/",
        sections: [
          {
            id: "s1",
            type: "hero",
            order: 0,
            visible: true,
            content: { title: `Welcome to ${subdomain}`, subtitle: "This site was generated and published by SiteForge." },
            styles: { backgroundColor: "#0f172a", color: "#ffffff", paddingTop: "120px", paddingBottom: "120px" },
            animations: { entrance: "fade-in" }
          },
          {
            id: "s2",
            type: "services",
            order: 1,
            visible: true,
            content: { title: "What We Do", subtitle: "Our core offerings." },
            styles: { backgroundColor: "#f8fafc", color: "#0f172a", paddingTop: "80px", paddingBottom: "80px" },
            animations: { entrance: "slide-up" }
          }
        ]
      }
    ]
  };
}

export async function generateMetadata({ params }: { params: { subdomain: string } }): Promise<Metadata> {
  const siteData = await getPublishedSiteData(params.subdomain);
  
  if (!siteData) {
    return {
      title: "Site Not Found",
      description: "The requested site does not exist."
    };
  }

  return {
    title: siteData.meta.title,
    description: siteData.meta.description,
    keywords: siteData.meta.keywords.join(", "),
    openGraph: {
      title: siteData.meta.title,
      description: siteData.meta.description,
      type: "website",
    }
  };
}

export const revalidate = 60; // ISR with 60s revalidation

export default async function PublishedSitePage({ params }: { params: { subdomain: string } }) {
  const siteData = await getPublishedSiteData(params.subdomain);

  if (!siteData) {
    notFound();
  }

  const page = siteData.pages[0];

  return (
    <div className="w-full min-h-screen bg-white" style={{ fontFamily: siteData.theme.fontFamily }}>
      {/* Dynamic Content */}
      <main>
        {!page.sections.some(s => s.type === "header" || s.type === "navbar") && (
          <HeaderSection 
            section={{ id: "auto-header", type: "header", content: { title: siteData.meta?.title?.split(" - ")[1] || "Our Business" }, order: -1, visible: true }} 
            theme={{ ...(siteData.theme || {}), logo: siteData.theme?.logo || (siteData as any).logo || (siteData as any).logoUrl, websiteLogo: (siteData as any).logo || (siteData as any).logoUrl } as any} 
            isEditing={false} 
          />
        )}
        {page.sections.filter(s => s.visible).sort((a, b) => a.order - b.order).map(section => (
          <SectionRenderer 
            key={section.id} 
            section={section} 
            theme={{ ...(siteData.theme || {}), logo: siteData.theme?.logo || (siteData as any).logo || (siteData as any).logoUrl, websiteLogo: (siteData as any).logo || (siteData as any).logoUrl } as any}
            // In publish mode, we do NOT pass isEditing
          />
        ))}
      </main>

      {/* Floating WhatsApp Button */}
      {siteData.globalSettings.whatsappButton && (
        <a 
          href={`https://wa.me/${siteData.globalSettings.whatsappNumber?.replace(/\D/g,'')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 h-14 w-14 bg-green-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50"
          aria-label="Contact us on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>
      )}

      {/* GDPR Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-300 p-4 text-xs flex flex-col sm:flex-row items-center justify-between z-40 border-t border-slate-800">
        <p>This website uses cookies to ensure you get the best experience. By continuing to use this site, you consent to our privacy policy.</p>
        <button className="mt-2 sm:mt-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors whitespace-nowrap ml-4">
          Got it
        </button>
      </div>

      {/* Analytics Script Mock */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // In a real app, this would post to /api/analytics/track
          console.log("SiteForge Analytics: Page View Tracked");
        `
      }} />
    </div>
  );
}
