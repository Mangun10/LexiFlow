import React from 'react';
import Link from 'next/link';

export default function RevisionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-[#BAD8B6]/10 to-[#8D77AB]/10 font-['Atkinson_Hyperlegible']">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#BAD8B6]/10 to-[#8D77AB]/10" />
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#8D77AB] mb-4">
            Revision Mode
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Review and revisit your saved websites with ease.
          </p>
          <Link href="/" className="inline-block bg-[#8D77AB] text-white px-8 py-4 rounded-lg hover:bg-[#8D77AB]/90">
            Go Home
          </Link>
        </div>
      </section>

      {/* Saved Websites Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#8D77AB]">Saved Websites</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Example Card */}
            <div className="p-6 bg-[#E1EACD] rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Website Title</h3>
              <p className="text-gray-700">
                Summary of the website goes here...
              </p>
            </div>
            <div className="p-6 bg-[#E1EACD] rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Another Website</h3>
              <p className="text-gray-700">
                Another summary goes here...
              </p>
            </div>
            {/* ...existing cards... */}
          </div>
        </div>
      </section>
    </main>
  );
}