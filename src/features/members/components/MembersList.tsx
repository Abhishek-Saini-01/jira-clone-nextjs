"use client"

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { useConfirm } from "@/hooks/useConfirm";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";
import { useDeleteMember } from "../api/useDeleteMember";
import { useGetMembers } from "../api/useGetMembers";
import { useUpdateMember } from "../api/useUpdateMember";
import { MemberRole } from "../types";
import MemberAvatar from "./MemberAvatar";

const MembersList = () => {
    const workspaceId = useWorkspaceId();
    const { data: membersList } = useGetMembers({ workspaceId });
    const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();
    const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember();

    const [ DeleteDialog, confrimDelete ] = useConfirm(
        "Remove member",
        "This member will be removed from the workspace",
        "destructive"
    )

    const handleUpdateMember = (memberId:string, role:MemberRole) => {
        updateMember({
            json: { role },
            param: {memberId}
        }, {
            onSuccess: () => {
                toast.success("Member role updated successfully")
            }
        })
    }

    const handleDeleteMember = async (memberId:string) => {
        const ok = await confrimDelete();
        if(!ok) return;

        deleteMember({ param : {memberId} }, {
            onSuccess: () => {
                window.location.reload();
                toast.success("Member deleted successfully");
            }
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <DeleteDialog />
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                <Button
                    size="sm"
                    variant="secondary"
                    asChild
                >
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className="size-4 mr-2" />
                        Back
                    </Link>
                </Button>
                <CardTitle className="text-xl font-bold">
                    Member List
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                {membersList?.documents.map((member, index) => (
                    <Fragment key={member.$id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                classname="size-10"
                                fallbackClassName="text-lg"
                                name={member.name}
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="ml-auto"
                                        variant="secondary"
                                        size="icon"
                                    >
                                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem
                                        className="font-medium cursor-pointer"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}
                                        disabled={isUpdatingMember || isDeletingMember}
                                    >
                                        Set as Administator
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium cursor-pointer"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                                        disabled={isUpdatingMember || isDeletingMember}
                                    >
                                        Set as Member
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium cursor-pointer text-amber-700"
                                        onClick={() => handleDeleteMember(member.$id)}
                                        disabled={isUpdatingMember || isDeletingMember}
                                    >
                                        Remove {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {index < membersList.documents.length - 1 && (
                            <Separator className="my-2.5" />
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    )
}

export default MembersList