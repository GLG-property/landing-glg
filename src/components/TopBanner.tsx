"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import clsx from "clsx";

const KEY = "glg-voucher-banner-dismissed";

/** Thin dismissible announcement bar above the navbar. */
export function TopBanner() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") setOpen(false);
    } catch {
      /* storage blocked — banner just stays visible */
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* privacy mode — dismissal just won't persist */
    }
  };

  return (
    <div
      className={clsx(
        "grid bg-brand text-white transition-all duration-300 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="overflow-hidden">
        <div className="relative mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-12 py-2 text-center">
          <p className="text-[0.85rem] font-light tracking-wide text-white/95">
            Voucher cadou de <span className="font-medium">200 lei</span> la înscrierea în
            sectoarele Botanica și Buiucani
            <Link
              href="#contact"
              className="ml-2 hidden font-medium underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white sm:inline"
            >
              Profită
            </Link>
          </p>
          <button
            onClick={dismiss}
            aria-label="Închide anunțul"
            className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-5"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
