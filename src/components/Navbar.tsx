"use client";

import UserButton from "@/features/auth/components/UserButton";
import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";

const pathnameMap = {
    "tasks": {
        title: "My Tasks",
        description: "View all of your tasks here",
    },
    "projects": {
        title: "My Project",
        description: "View tasks of your project here",
    }
}
const defaultMap = {
    title: "Home",
    description: "Monitor all of your prjects and task here",
}

const Navbar = () => {
    const pathname = usePathname();
    const pathnameParts = pathname.split("/");
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

    const { title, description } = pathnameMap[pathnameKey] || defaultMap;

    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <div className="text-2xl font-semibold">{title}</div>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <MobileSidebar />
            <UserButton />
        </nav>
    )
}

export default Navbar