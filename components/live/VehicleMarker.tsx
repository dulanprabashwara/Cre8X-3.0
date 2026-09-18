"use client";

import React from "react";
import { motion } from "framer-motion";

interface VehicleMarkerProps {
  x: number;
  y: number;
  angle?: number;
}

export function VehicleMarker({ x, y, angle = -35 }: VehicleMarkerProps) {
  return (
    <g transform={`translate(${x}, ${y})`} className="cursor-pointer select-none">
      {/* Outer pulsing bioluminescent halo */}
      <motion.circle
        r={14}
        fill="rgba(47, 174, 99, 0.25)"
        animate={{ r: [14, 22, 14], opacity: [0.6, 0.2, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      />

      {/* Mid soft glow circle */}
      <circle r={10} fill="rgba(47, 174, 99, 0.45)" />

      {/* White rim container */}
      <circle r={6.5} fill="#FFFFFF" filter="drop-shadow(0px 2px 4px rgba(35, 29, 43, 0.2))" />

      {/* Inner vibrant Luciferin Green core */}
      <circle r={4.5} fill="#2FAE63" />

      {/* Directional beam pointer */}
      <g transform={`rotate(${angle})`}>
        <polygon
          points="0,-12 -3,-8 3,-8"
          fill="#2FAE63"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
      </g>
    </g>
  );
}
