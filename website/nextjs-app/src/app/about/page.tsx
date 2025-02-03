// app/about/page.tsx
"use client"
import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

const DyslexiaSimulation = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

  const scrambleText = () => {
    if (!containerRef.current) return
    
    const scramble = (node: ChildNode) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.nodeValue?.split(/\b/) || []
        const scrambled = words.map(word => {
          if (word.length > 3) {
            const originalMiddle = word.slice(1, -1)
            let middle = originalMiddle.split('')
            let attempts = 0
            do {
              // Fisher-Yates shuffle
              for (let i = middle.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[middle[i], middle[j]] = [middle[j], middle[i]]
              }
              attempts++
            } while (attempts < 10 && middle.join('') === originalMiddle)
            return word[0] + middle.join('') + word.slice(-1)
          }
          return word
        })
        node.nodeValue = scrambled.join('')
      } else if (node.childNodes.length) {
        node.childNodes.forEach(scramble)
      }
    }

    containerRef.current.childNodes.forEach(scramble)
  }

  useEffect(() => {
    const id = setInterval(scrambleText, 300)
    setIntervalId(id)
    return () => clearInterval(id)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative group prose-lg leading-relaxed text-gray-700"
      onMouseEnter={() => {
        if (intervalId) {
          clearInterval(intervalId)
          setIntervalId(undefined)
        }
      }}
      onMouseLeave={() => {
        if (intervalId) clearInterval(intervalId)
        const newId = setInterval(scrambleText,300)
        setIntervalId(newId)
      }}
    >
      {children}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F9F6E6] to-[#E1EACD] font-['Atkinson_Hyperlegible']">
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-[#8D77AB] text-center">
              Redefining <span className="text-[#BAD8B6]">Accessible</span> Education
            </h1>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                At <span className="text-[#8D77AB] font-semibold">LexiFlow</span>, we're revolutionizing
                how people with learning differences interact with text. Our platform combines
                <span className="bg-[#E1EACD] px-2 py-1 rounded-md mx-1">cognitive research</span> with
                <span className="bg-[#8D77AB] text-white px-2 py-1 rounded-md">cutting-edge technology</span>
                to create truly inclusive learning experiences.
              </p>

              <div className="bg-[#F9F6E6] p-6 rounded-xl my-8">
                <h3 className="text-2xl font-bold text-[#BAD8B6] mb-4">Our Innovations</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    "Adaptive text rendering engine",
                    "Real-time reading pattern analysis",
                    "Dynamic contrast optimization",
                    "Multi-modal content processing",
                    "Personalized learning profiles",
                    "Cross-platform accessibility SDK"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-[#8D77AB]">▹</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 p-8 bg-[#F9F6E6] rounded-xl border-2 border-[#BAD8B6]/30">
                <DyslexiaSimulation>
                  <p className="text-lg md:text-xl !leading-[1.8] mb-8">
                    Experience the challenge firsthand: As yuo raed tihs snetence, notcie how the ltetres 
                    seem to jmuble and sfti - 'exeprience' becomes 'expirence', 'sentence' truns into 
                    'snetence', and 'letters' might aepapr as 'lettesr'. This dnmaic text demosntartion 
                    replciates the dai ly struglge of mililons. Hvoer to stablzie the txet, siuamlting 
                    the intesne focsu required. Our dtata shows a 40% incerase in cohntiive lod when 
                    daeling with unscarmbed text, hghilgiht the need for sppout tools.
                  </p>
                </DyslexiaSimulation>

                <div className="text-center space-y-4">
                  <p className="text-[#8D77AB] font-medium">
                    Why our solution works:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { num: '2.5x', label: 'Faster comprehension' },
                      { num: '55%', label: 'Reduced eye strain' },
                      { num: '90%', label: 'User satisfaction' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-[#BAD8B6]">{stat.num}</div>
                        <div className="text-sm text-[#8D77AB]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-8">
                Our <span className="text-[#8D77AB] font-medium">neural adaptation algorithms</span> 
                actively learn from user interactions, continuously optimizing layout and presentation. 
                Through partnerships with leading universities, we've validated a 
                <span className="bg-[#BAD8B6] px-2 py-1 rounded-md mx-1">72% improvement</span> 
                in reading retention across diverse user groups.
              </p>

              <div className="mt-12 bg-gradient-to-r from-[#BAD8B6]/20 to-[#8D77AB]/20 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-[#8D77AB] mb-6 text-center">
                  Join Our Mission
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#BAD8B6]">For Individuals</h4>
                    <ul className="space-y-2">
                      {["Free browser extension", "Mobile apps", "Personalized dashboard"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#8D77AB]">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#BAD8B6]">For Organizations</h4>
                    <ul className="space-y-2">
                      {["Enterprise solutions", "ADA compliance tools", "Team analytics"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#8D77AB]">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center space-y-6">
                <div className="flex justify-center gap-4">
                  <Link href="/login">
                    <Button className="bg-[#8D77AB] text-white px-8 py-6 text-lg hover:bg-[#8D77AB]/90">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-[#8D77AB] text-[#8D77AB] px-8 py-6 text-lg">
                      Request Demo
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-[#8D77AB]/80">
                  Used by 50,000+ learners across 120 countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
