"use client";
import Link from "next/link";
import styles from "./nav-link.module.css";

import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));
  // The isActive check ensures that the link is active if the current path
  // is exactly the href or if the href is a prefix of the current path.
  return (
    <Link
      href={href}
      prefetch={false}
      className={isActive ? styles.active : undefined}
      data-active={isActive ? "true" : "false"}
    >
      {children}
    </Link>
  );
}
