"use client"

import { useGetWorkspces } from "@/features/workspaces/api/useGetWorkspaces";
import { RiAddCircleFill } from "react-icons/ri";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import WorkspaceAvatar from "@/features/workspaces/components/WorkspaceAvatar";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/useCreateWorkspaceModal";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { useRouter } from "next/navigation";

const WorkspaceSwitcher = () => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { data: workspaces } = useGetWorkspces();
    const { open } = useCreateWorkspaceModal();

    const onSelect = (id: string) => {
        router.push(`/workspaces/${id}`)
    }
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Workspace</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-400 cursor-pointer hover:opacity-75 transition" />
            </div>

            <Select onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                    <SelectValue placeholder="No workspace selected" />
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem key={workspace.$id} value={workspace.$id}>
                            <div className="flex justify-start items-center gap-3 font-medium">
                                <WorkspaceAvatar
                                    name={workspace.name}
                                    image={workspace.imageUrl}
                                />
                                <span className="truncate">{workspace.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default WorkspaceSwitcher