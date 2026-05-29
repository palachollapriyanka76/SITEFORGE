import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-4">Could not find requested resource</p>
      <Link href="/" className="text-[#52796F] font-semibold hover:text-[#354F52] hover:underline transition-colors">Return Home</Link>
    </div>
  );
}
