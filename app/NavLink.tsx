"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  highlight,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  if (highlight) {
    return (
      <Link
        href={href}
        className={`transition-colors font-medium ${
          isActive
            ? "text-emerald-300"
            : "text-emerald-400 hover:text-emerald-300"
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`transition-colors ${
        isActive
          ? "text-zinc-100 font-medium"
          : "text-zinc-400 hover:text-zinc-100"
      }`}
    >
      {children}
    </Link>
  );
}
