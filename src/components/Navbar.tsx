import UserButton from "@/features/auth/components/UserButton"
import MobileSidebar from "./MobileSidebar"

const Navbar = () => {
    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <div className="text-2xl font-semibold">Home</div>
                <p className="text-muted-foreground">Monitor all of your prjects and task here</p>
            </div>
            <MobileSidebar />
            <UserButton />
        </nav>
    )
}

export default Navbar