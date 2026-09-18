"use client";

import React from "react";

export function NovaLogo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Bioluminescent App Icon */}
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-white to-[#F3EEFA] border border-nova-border/60 shadow-xs flex items-center justify-center overflow-hidden">
        {/* Subtle ambient glow inside */}
        <div className="absolute inset-0 bg-radial from-nova-green/10 via-nova-coral/10 to-transparent" />

        {/* Stylized geometric N logo with connecting node dots */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <path
            d="M5 19V5L19 19V5"
            stroke="url(#nova-logo-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="5" cy="5" r="2.2" fill="#2FAE63" />
          <circle cx="19" cy="19" r="2.2" fill="#E85F8E" />
          <defs>
            <linearGradient
              id="nova-logo-grad"
              x1="5"
              y1="5"
              x2="19"
              y2="19"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2FAE63" />
              <stop offset="0.5" stopColor="#9C6CEE" />
              <stop offset="1" stopColor="#E85F8E" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand typography */}
      <div className="flex flex-col">
        <span className="font-heading font-bold text-[18px] leading-tight text-nova-text-primary tracking-tight">
          NOVA
        </span>
        <span className="font-heading text-[12px] font-medium tracking-[0.14em] text-nova-text-muted uppercase">
          Mobility OS 2100
        </span>
      </div>
    </div>
  );
}
