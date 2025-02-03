// import Link from "next/link"

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen bg-[#F9F6E6] font-['Atkinson_Hyperlegible']">
//       {/* Navigation */}
//       <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="text-2xl font-bold">
//             <span className="text-[#BAD8B6]">Lexi</span>
//             <span className="text-[#8D77AB]">Flow</span>
//           </div>
//           <div className="flex items-center gap-8">
//             <Link href="#features" className="text-gray-700 hover:text-[#8D77AB]">
//               Features
//             </Link>
//             <Link href="#about" className="text-gray-700 hover:text-[#8D77AB]">
//               About
//             </Link>
//             <Link href="#contact" className="text-gray-700 hover:text-[#8D77AB]">
//               Contact
//             </Link>
//             <Link href="/login">
//               <button className="bg-[#8D77AB] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
//                 Login
//               </button>
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#F9F6E6] to-[#E1EACD]">
//         <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
//           <div className="flex-1 space-y-8">
//             <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-[#8D77AB]">
//               LexiFlow: Empowering Minds & Easing Reading Struggles
//             </h1>
//             <p className="text-xl text-gray-700 max-w-2xl">
//               Designed for dyslexia support and effective memory management, LexiFlow offers a customizable reading experience with tools that make studying smarter and reading easier.
//             </p>
//             <div className="flex gap-4">
//               <Link href="/login">
//                 <button className="bg-[#8D77AB] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
//                   Get Started
//                 </button>
//               </Link>
//               <Link href="#features">
//                 <button className="bg-[#E1EACD] text-gray-700 px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
//                   Learn More
//                 </button>
//               </Link>
//             </div>
//           </div>
          
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-[#8D77AB]">Our Features</h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <h3 className="text-2xl font-bold text-gray-800">Simplified Engine</h3>
//               <p className="text-gray-600">Streamlined processing to enhance reading clarity and comprehension.</p>
//             </div>
//             <div className="space-y-4">
//               <h3 className="text-2xl font-bold text-gray-800">OCR</h3>
//               <p className="text-gray-600">Convert images to editable text quickly and accurately.</p>
//             </div>
//             <div className="space-y-4">
//               <h3 className="text-2xl font-bold text-gray-800">Eye Tracking</h3>
//               <p className="text-gray-600">Monitor reading patterns to provide real-time assistance.</p>
//             </div>
//             <div className="space-y-4">
//               <h3 className="text-2xl font-bold text-gray-800">TTS</h3>
//               <p className="text-gray-600">Text-to-speech functionality to make reading accessible.</p>
//             </div>
//             <div className="space-y-4">
//               <h3 className="text-2xl font-bold text-gray-800">Focus Mode</h3>
//               <p className="text-gray-600">Minimize distractions with a dedicated study interface.</p>
//             </div>
//             <div className="space-y-4">
//               <h3 className="text-2xl font-bold text-gray-800">Color Blindness Support</h3>
//               <p className="text-gray-600">Tailor the interface with color schemes for maximum clarity.</p>
//             </div>
//             <div className="space-y-4 md:col-span-2">
//               <h3 className="text-2xl font-bold text-gray-800">Revision Mode</h3>
//               <p className="text-gray-600">Enhance learning with tools that support effective revision and memory retention.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-gradient-to-b from-[#E1EACD] to-[#F9F6E6]">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-[#8D77AB] mb-6">About LexiFlow</h2>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto">
//             LexiFlow is born from the need to assist individuals with dyslexia and students who want to optimize their study routines.
//             Our intuitive design and powerful features combine to create a truly accessible platform for everyone.
//           </p>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-20 bg-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-[#8D77AB] mb-6">Get In Touch</h2>
//           <p className="text-lg text-gray-700 mb-8">
//             Have feedback or need support? We'd love to hear from you.
//           </p>
//           <Link href="/contact">
//             <button className="bg-[#8D77AB] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
//               Contact Us
//             </button>
//           </Link>
//         </div>
//       </section>
//       {/* ...existing footer or additional sections... */}
//     </main>
//   )
// }


import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F9F6E6] font-['Atkinson_Hyperlegible']">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-3xl font-bold">
            <span className="text-[#BAD8B6]">Lexi</span>
            <span className="text-[#8D77AB]">Flow</span>
          </div>
          <div className="flex items-center gap-8">
            {/* <Link href="#features" className="text-gray-700 hover:text-[#8D77AB] transition-colors">
              Features
            </Link> */}
            <Link href="/about" className="text-gray-700 hover:text-[#8D77AB] transition-colors">
              About
            </Link>
            {/* <Link href="#contact" className="text-gray-700 hover:text-[#8D77AB] transition-colors">
              Contact
            </Link> */}
            <Link href="/login">
                <Button className="bg-[#8D77AB] text-white hover:bg-[#8D77AB]/90">Get Started</Button>
          </Link>
           
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#BAD8B6]/10 to-[#8D77AB]/10" />
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 relative">
          <div className="flex-1 space-y-8">
            <div className="inline-block bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full text-[#8D77AB]">
              ✨ Making reading accessible for everyone
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-[#BAD8B6]">Study</span> with
              <br />
              <span className="text-[#8D77AB]">Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Transform your reading experience with our dyslexia-friendly tools. Personalize fonts, spacing, and colors
              to make learning effortless.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#8D77AB] text-white px-8 py-6 text-lg hover:bg-[#8D77AB]/90">
                Install Extension
              </Button>
              <Button
                variant="outline"
                className="border-[#E1EACD] bg-[#E1EACD]/50 text-gray-700 px-8 py-6 text-lg hover:bg-[#E1EACD]"
              >
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#BAD8B6]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Free Installation
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#BAD8B6]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Works Everywhere
              </span>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#BAD8B6]/20 to-[#8D77AB]/20 rounded-2xl blur-2xl" />
            <div className="bg-white rounded-2xl p-8 shadow-xl relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold bg-gradient-to-r from-[#BAD8B6] to-[#8D77AB] text-transparent bg-clip-text">
                    Reading Settings
                  </span>
                  <div className="flex gap-2 bg-[#F9F6E6] p-1 rounded-full">
                    <button className="px-4 py-1 rounded-full text-sm bg-white shadow-sm">Light</button>
                    <button className="px-4 py-1 rounded-full text-sm text-gray-600">Dark</button>
                  </div>
                </div>
                <div className="space-y-6">
                  {["Font Size", "Line Spacing", "Word Spacing"].map((setting, index) => (
                    <div key={index} className="bg-[#F9F6E6] p-4 rounded-xl">
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-600">{setting}</span>
                        <span className="text-[#8D77AB] font-medium">
                          {index === 0 ? "16px" : index === 1 ? "1.5" : "2px"}
                        </span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#BAD8B6] to-[#8D77AB] rounded-full"
                          style={{ width: `${(index + 1) * 25}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="bg-[#F9F6E6] p-4 rounded-xl">
                    <label className="text-gray-600 block mb-3">Choose Font</label>
                    <select className="w-full bg-white border-2 border-[#E1EACD] rounded-lg px-4 py-2 appearance-none cursor-pointer">
                      <option>OpenDyslexic</option>
                      <option>Atkinson Hyperlegible</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F9F6E6]/30" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#BAD8B6]">Features</span> that make
              <span className="text-[#8D77AB]"> reading easier</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Our tools are designed with accessibility in mind, making reading and learning more comfortable for
              everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📚",
                title: "Dyslexia-Friendly Fonts",
                description: "Choose between specially designed fonts that enhance readability",
              },
              {
                icon: "🎯",
                title: "Smart Spacing",
                description: "Customize line height and letter spacing for optimal reading flow",
              },
              {
                icon: "🎨",
                title: "Color Themes",
                description: "Select from scientifically proven color combinations that reduce eye strain",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#F9F6E6] p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#8D77AB] mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#F9F6E6]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Trusted by <span className="text-[#8D77AB]">students</span> and
            <span className="text-[#BAD8B6]"> educators</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#E1EACD] rounded-full" />
                  <div>
                    <div className="font-bold text-[#8D77AB]">Student Name</div>
                    <div className="text-sm text-gray-500">University Student</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "LexiFlow has made a significant difference in my studies. The customizable features help me focus
                  better while reading."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#BAD8B6]/20 to-[#8D77AB]/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to transform your reading experience?</h2>
          <Button className="bg-[#8D77AB] text-white px-8 py-6 text-lg hover:bg-[#8D77AB]/90">Get Started Now</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-[#BAD8B6]">Lexi</span>
                <span className="text-[#8D77AB]">Flow</span>
              </div>
              <p className="text-gray-600">Making reading accessible for everyone.</p>
            </div>
            {["Product", "Company", "Resources"].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4">{section}</h3>
                <ul className="space-y-2">
                  {["Features", "Pricing", "Support", "Contact"].map((item, idx) => (
                    <li key={idx}>
                      <Link href="#" className="text-gray-600 hover:text-[#8D77AB]">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}