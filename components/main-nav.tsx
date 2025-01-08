"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname() || ""; // Default jika pathname undefined
  const storeId = pathname.split("/")[1] || ""; // Ambil bagian pertama dari path atau default ke string kosong

  const routes = [
    {
      href: `/${storeId}`, // Gunakan storeId yang diambil dari pathname
      label: `Dashboard`,
      active: pathname === `/${storeId}`, // Tandai jika route aktif
    },
    {
      href: `/${storeId}/banners`,
      label: `Banners`,
      active: pathname === `/${storeId}/banners`,
    },

    {
      href: `/${storeId}/categories`,
      label: `Categories`,
      active: pathname === `/${storeId}/categories`,
    },

    {
      href: `/${storeId}/products`,
      label: `Menu`,
      active: pathname === `/${storeId}/products`,
    },

    {
      href: `/${storeId}/settings`,
      label: `Settings`,
      active: pathname === `/${storeId}/settings`,
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <ul className="flex space-x-4">
        {routes.map((route) => (
          <li key={route.href}>
            <Link
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
