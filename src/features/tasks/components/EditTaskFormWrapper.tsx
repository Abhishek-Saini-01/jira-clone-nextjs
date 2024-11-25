import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { Loader } from "lucide-react";
import { useGetTask } from "../api/useGetTask";
import EditTaskForm from "./EditTaskForm";

interface EditTaskFormWrapperProps {
    onCancel: () => void;
    id: string;
}

const EditTaskFormWrapper = ({
    onCancel,
    id
}: EditTaskFormWrapperProps) => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading: isLoadingTask } = useGetTask({ taskId: id })
    const { data: projects, isLoading: isProjectsLoading } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId });

    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl
    }))
    const memberOptions = members?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
    }))
    const isLoading = isMembersLoading || isProjectsLoading || isLoadingTask;
    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    if (!initialValues) {
        return null;
    }

    return (
        <EditTaskForm
            onCancel={onCancel}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}
            initialValues={initialValues}
        />
    )
}

export default EditTaskFormWrapper