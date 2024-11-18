"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useJoinWorkspace } from "../api/useJoinWorkspace";
import { useInviteCode } from "../hooks/useInviteCode";
import { useWorkspaceId } from "../hooks/useWorkspaceId";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    }
}

const JoinWorkspaceForm = ({
    initialValues
}:JoinWorkspaceFormProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const {mutate: joinWorkspace, isPending } = useJoinWorkspace();
    console.log({inviteCode});
    
    const onSubmit = () => {
        joinWorkspace({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({ data }) => {
                toast.success("Workspace joined successfully")
                router.push(`/workspaces/${data.$id}`)
            }
        })
    }
    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join <strong>{initialValues.name}</strong> workspace
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col gap-y-2 lg:flex-row items-center justify-between">
                    <Button
                        className="w-full lg:w-fit"
                        variant="secondary"
                        type="button"
                        asChild
                        size="lg"
                        disabled={isPending}
                    >   
                    <Link href="/">
                        Cancel
                    </Link>
                    </Button>
                    <Button
                        className="w-full lg:w-fit"
                        size="lg"
                        type="button"
                        disabled={isPending}
                        onClick={onSubmit}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default JoinWorkspaceForm