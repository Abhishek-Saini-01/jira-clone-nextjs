import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";



interface WorkspaceAvatarProps {
    image?: string;
    name: string;
    classname?: string;
}

const WorkspaceAvatar = ({
    name,
    classname,
    image
}: WorkspaceAvatarProps) => {
    if (image) {
        return (
            <div className={cn(
                "size-10 relative rounded-md overflow-hidden",
                classname,
            )}>
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        )
    }

    return (
        <Avatar className={
            cn("size-10 rounded-md", classname)
        }>
            <AvatarFallback className="text-white bg-blue-600 font-semibold rounded-md uppercase text-lg">
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}

export default WorkspaceAvatar