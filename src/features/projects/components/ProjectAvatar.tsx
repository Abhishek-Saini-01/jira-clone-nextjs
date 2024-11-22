import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { twMerge } from "tailwind-merge";


interface ProjectAvatarProps {
    image?: string;
    name: string;
    classname?: string;
    fallbackClassName?: string;
}

const ProjectAvatar = ({
    name,
    classname,
    image,
    fallbackClassName
}: ProjectAvatarProps) => {
    if (image) {
        return (
            <div className={cn(
                "size-5 relative rounded-md overflow-hidden",
                classname,
            )}>
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        )
    }

    return (
        <Avatar className={
            cn("size-5 rounded-md", classname)
        }>
            <AvatarFallback className={twMerge(
                "text-white bg-blue-600 font-semibold text-sm uppercase rounded-md",
                fallbackClassName
            )}>
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}

export default ProjectAvatar