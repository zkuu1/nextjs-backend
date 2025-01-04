"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { usePathname } from "next/navigation"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();

    // Mendapatkan storeId dari pathname (misalnya /storeId/settings)
    const storeId = pathname.split('/')[1]; // Asumsikan storeId ada di path pertama

    const routes = [
        {
            href: `/${storeId}/settings`, // Gunakan storeId yang didapatkan dari pathname
            label: `Settings`,
            active: pathname === `/${storeId}/settings`, // Menandai jika route aktif
        }
    ];

    return (
        <nav className={cn(
            "flex items-center space-x-4 lg:space-x-6",
            className
        )}>
            <ul className="flex space-x-4">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-black dark:text-white" : "text-muted-foreground"
                        )}
                    >
                        {route.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
}

export default MainNav;
