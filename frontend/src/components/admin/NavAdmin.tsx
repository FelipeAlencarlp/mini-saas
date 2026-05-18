"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HiOutlinePresentationChartBar as dashboardIcon,
    HiOutlineUsers as usersIcon
} from "react-icons/hi2";

export default function NavAdmin() {
    const pathname = usePathname();

    const menu = [
        { icon: dashboardIcon, name: 'Dashboard', href: '/admin' },
        { icon: usersIcon, name: 'Usuários', href: '/admin/users' },
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
                            flex gap-2 px-3 py-1 mx-5
                            items-center rounded transition
                            ${isActive
                                ? "bg-gray-600 font-semibold"
                                : "hover:bg-gray-500"
                            }
                        `}
                    >
                        {<item.icon size={20}/>}
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}