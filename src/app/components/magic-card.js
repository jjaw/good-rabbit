"use client";

import React from "react";
import { cn } from "../../lib/utils";

export const MagicCard = ({
  children,
  className,
}) => {
  // Mouse hover effect removed for cleaner design

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-xl p-6",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

MagicCard.displayName = "MagicCard";