import React from 'react';

export default function RevisionPage() {
  return (
    <div className="min-h-screen bg-[#F9F6E6] font-sans text-gray-900">
      <header className="p-6 bg-[#BAD8B6] text-center">
        <h1 className="text-4xl font-bold">Revision Mode</h1>
      </header>
      <main className="container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Saved Websites</h2>
          {/* Replace with dynamic saved website summaries */}
          <div className="space-y-4">
            <div className="p-4 bg-[#E1EACD] rounded-lg shadow">
              <h3 className="text-xl font-bold">Website Title</h3>
              <p className="mt-2 text-base" style={{ maxWidth: "70ch" }}>
                Summary of the website goes here...
              </p>
            </div>
            <div className="p-4 bg-[#E1EACD] rounded-lg shadow">
              <h3 className="text-xl font-bold">Another Website</h3>
              <p className="mt-2 text-base" style={{ maxWidth: "70ch" }}>
                Another summary goes here...
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}