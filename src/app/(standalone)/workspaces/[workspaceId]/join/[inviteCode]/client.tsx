"use client";

import PageError from "@/components/PageError";
import PageLoader from "@/components/PageLoader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/useGetWorkspaceInfo";
import JoinWorkspaceForm from "@/features/workspaces/components/JoinWorkspaceForm";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

const InviteCodeClientPage = () => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isPending } = useGetWorkspaceInfo({ workspaceId });
    if (!initialValues) {
        return <PageError
            message="Workspace invite code not found"
        />
    }
    if (isPending) {
        return <PageLoader />
    }
    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm
                initialValues={initialValues}
            />
        </div>
    )
}

export default InviteCodeClientPage