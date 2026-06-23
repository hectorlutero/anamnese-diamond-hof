"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="relative mb-8 text-center">
      <div className="mb-4 flex items-center justify-center gap-4">
        <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-gold-400" />
        <Image
          src="/logo.png"
          alt="Diamond HOF"
          width={120}
          height={120}
          className="drop-shadow-sm"
          priority
        />
        <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-gold-400" />
      </div>
      <p className="text-xs font-medium tracking-[0.25em] text-gold-600 uppercase">
        Estética Integrada Premium
      </p>
    </header>
  );
}
