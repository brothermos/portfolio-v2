"use client";

import Image from "next/image";
import { useState } from "react";

import { getTickerLogoUrl } from "@/lib/stocks/logo";

type StockLogoProps = {
  symbol: string;
  size?: number;
  className?: string;
};

export function StockLogo({ symbol, size = 20, className }: StockLogoProps) {
  const [failed, setFailed] = useState(false);
  const src = getTickerLogoUrl(symbol, size * 2);

  if (!src || failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-stone-200 font-mono text-[10px] font-semibold text-stone-700 ${className ?? ""}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {symbol.slice(0, 2)}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 rounded-full bg-stone-100 object-contain ${className ?? ""}`}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
