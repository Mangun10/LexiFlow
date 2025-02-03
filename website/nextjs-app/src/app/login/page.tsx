"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/revision");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BAD8B6]/10 to-[#8D77AB]/10 flex items-center justify-center">
      <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-[#8D77AB] mb-6">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-base font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D77AB]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D77AB]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-[#8D77AB] text-white font-bold rounded-lg hover:bg-opacity-90">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#8D77AB] font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}