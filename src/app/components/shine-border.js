"use client";

import React from "react";
import { cn } from "../../lib/utils";

export const ShineBorder = ({
  className,
  borderRadius = 8,
  borderWidth = 1,
  color = "#a8a29e",
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-white/90 backdrop-blur-3xl border border-stone-200/50",
        className,
      )}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-lg border-2 border-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 focus-within:opacity-100"
        style={{
          background: `linear-gradient(white, white) padding-box, conic-gradient(from 0deg, transparent, ${color}, transparent 30%) border-box`,
          borderRadius: `${borderRadius}px`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

ShineBorder.displayName = "ShineBorder";