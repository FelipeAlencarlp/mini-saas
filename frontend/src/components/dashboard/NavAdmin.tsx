"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HiOutlinePresentationChartBar as dashboardIcon,
    HiOutlineUsers as usersIcon,
    HiOutlineIdentification as clientsIcon,
    HiOutlineInboxStack as productsIcon
} from "react-icons/hi2";

export default function NavAdmin() {
    const pathname = usePathname();

    const menu = [
        { icon: dashboardIcon, name: 'Dashboard', href: '/admin' },
        { icon: usersIcon, name: 'Usuários', href: '/admin/users' },
        { icon: clientsIcon, name: 'Clientes', href: '/admin/clients' },
        { icon: productsIcon, name: 'Produtos', href: '/admin/products' },
    ];

    return (
        <nav className="flex flex-col gap-3">
            {menu.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        title={item.name}
                        className={`
                            group flex gap-2 px-3 py-1 mx-5
                            items-center rounded transition
                            ${isActive
                                ? "bg-gray-700 font-semibold"
                                : "hover:bg-gray-600"
                            }
                        `}
                    >
                        <item.icon
                            size={20}
                            className={`
                                transition-colors
                                ${isActive
                                    ? "text-gray-300"
                                    : "group-hover:text-gray-300"
                                }
                            `}
                        />

                        <span
                            className={`
                                transition-colors
                                ${isActive
                                    ? "text-gray-300"
                                    : "group-hover:text-gray-300"
                                }
                            `}
                        >
                            |
                        </span>

                        <span
                            className={`
                                transition-all
                                ${isActive
                                    ? "bg-linear-to-r from-gray-300 to-blue-600 bg-clip-text text-transparent"
                                    : "group-hover:bg-linear-to-r group-hover:from-gray-300 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent"
                                }
                            `}
                        >
                            {item.name}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}