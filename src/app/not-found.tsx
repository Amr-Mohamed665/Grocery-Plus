"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search, Ghost } from "lucide-react";
import Container from "@/components/common/Container";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Illustration Area */}
          <div className="mb-8 relative inline-block">
            <div className="relative z-10 text-[#0142629a] opacity-80 mx-auto">
              <Ghost size={120} strokeWidth={1.5} />
            </div>
            
            <h1 className="text-[160px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-[#014162] to-[#01416233] select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 -z-10">
              404
            </h1>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Oops! Page not found
            </h2>
            <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
              The page you're searching for might have been moved, removed, or never existed in the first place.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="group flex items-center gap-2 px-8 py-4 bg-[#014162] text-white rounded-2xl font-semibold shadow-xl shadow-[#01416233] hover:shadow-[#01416266] hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
            
            <Link 
              href="/shop"
              className="group flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 hover:border-slate-200 transition-all duration-300"
            >
              <Search size={20} className="group-hover:rotate-12 transition-transform text-slate-400 group-hover:text-[#014162]" />
              Search Products
            </Link>
          </div>

          {/* Secondary Action */}
          <div className="mt-16 pt-8 border-t border-slate-100">
            <button 
              onClick={() => window.history.back()}
              className="text-slate-500 hover:text-[#014162] inline-flex items-center gap-2 font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              Go back to previous page
            </button>
          </div>
        </div>
      </Container>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 -z-20 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#014162 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
    </main>
  );
}
