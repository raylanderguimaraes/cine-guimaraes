import Link from "next/link";
import Logo from "./Logo";

interface NavLink {
  name: string;
  href: string;
}

export default function Header() {
  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Filmes", href: "/filmes" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    // desenvolver um header para o site do cinema
    <nav className="bg-gray-800 flex justify-between items-center h-16 p-4">
      <Logo />

      <ul className="flex gap-4 list-none">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
