"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";

interface NavLink {
  name: string;
  href: string;
}

export default function Header() {
  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Contato", href: "/contato" },
  ];

  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center h-16 p-4">
      <Logo />

      <ul className="flex gap-4 list-none ">
        {links.map((link) => {
          const isActive = pathname.endsWith(link.href);

          return (
            <Link
              className={isActive ? "text-cyan-500" : "text-white"}
              href={link.href}
              key={link.name}>
              {link.name}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
