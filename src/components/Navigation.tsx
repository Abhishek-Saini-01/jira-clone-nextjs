"use client"

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
import {
    Settings,
    UsersIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    GoCheckCircle,
    GoCheckCircleFill,
    GoHome,
    GoHomeFill
} from "react-icons/go";


const routes = [
    {
        label: "Home",
        href: "",
        icon: GoHome,
        active: GoHomeFill
    }, {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        active: GoCheckCircleFill
    }, {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        active: Settings
    }, {
        label: "Members",
        href: "/members",
        icon: UsersIcon,
        active: UsersIcon
    },
]

const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();
    return (
        <ul className="flex flex-col">
            {routes.map((route) => {
                const fullHref = `/workspaces/${workspaceId}${route.href}`
                const isActive = pathname === fullHref;
                const Icon = isActive ? route.active : route.icon;

                return (
                    <Link key={route.href} href={fullHref}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                            isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                        )}>
                            <Icon className="size-5 text-neutral-500" />
                            {route.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    )
}

export default Navigation