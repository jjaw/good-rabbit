"use client";

import React from "react";
import { cn } from "../../lib/utils";

export const ShineBorder = ({
  className,
  borderRadius = 8,
  borderWidth = 1,
  color = "#fb923c",
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-slate-700/80 backdrop-blur-3xl border border-slate-600/60 shadow-sm",
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
          background: `linear-gradient(#334155, #334155) padding-box, conic-gradient(from 0deg, transparent, ${color}, transparent 30%) border-box`,
          borderRadius: `${borderRadius}px`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

ShineBorder.displayName = "ShineBorder";