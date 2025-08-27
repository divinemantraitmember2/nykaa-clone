"use client";

import React from "react";
import { Truck, RotateCw, ShieldCheck, Sparkles } from "lucide-react";

// Map icon string to Lucide components
const iconMap = {
  truck: Truck,
  return: RotateCw,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

const TrustBadges = ({ badges }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const IconComponent = iconMap[badge.icon];
          return (
            <div
              key={badge.title}
              className="bg-card text-card-foreground shadow-sm rounded-2xl "
            >
              <div className="p-6 py-6 flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-xl bg-zinc-100">
                  {IconComponent && <IconComponent className="h-5 w-5" />}
                </div>
                <div className="font-semibold text-sm">{badge.title}</div>
                <div className="text-xs opacity-70">{badge.caption}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustBadges;
