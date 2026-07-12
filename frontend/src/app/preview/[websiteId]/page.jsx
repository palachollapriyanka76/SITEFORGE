"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
const LivePreview = dynamic(() => import("../../../components/editor/LivePreview"), { ssr: false });

export default function PreviewPage({ params }) {
  const { websiteId } = params;
  const [websiteJSON, setWebsiteJSON] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWebsite() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/websites/${websiteId}/json`
        );
        if (response.data && response.data.success) {
          setWebsiteJSON(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load website JSON for preview:", err);
      } finally {
        setLoading(false);
      }
    }
    loadWebsite();
  }, [websiteId]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white font-mono gap-3">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading Live Preview...</span>
      </div>
    );
  }

  if (!websiteJSON) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white font-mono gap-3 text-center p-6">
        <span className="text-rose-500 text-lg font-bold">404 - Website Not Found</span>
        <span className="text-zinc-500 text-sm max-w-md">The website configuration may not exist or has been deleted.</span>
        <a href="/dashboard" className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-all shadow-lg">Back to Dashboard</a>
      </div>
    );
  }

  return <LivePreview websiteJSON={websiteJSON} isEditor={false} device="desktop" />;
}
