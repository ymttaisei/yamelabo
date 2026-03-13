"use client";

import Link from "next/link";
import { sendEvent } from "@/lib/gtag";

type Props = {
  href: string;
  ctaType: string;
  ctaLocation: string;
  className?: string;
  children: React.ReactNode;
};

export function TrackedCtaLink({
  href,
  ctaType,
  ctaLocation,
  className,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        sendEvent("cta_click", { cta_type: ctaType, cta_location: ctaLocation })
      }
    >
      {children}
    </Link>
  );
}
