"use client";

import PageError from "@/components/PageError";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/useGetProject";
import ProjectAvatar from "@/features/projects/components/ProjectAvatar";
import { useProjectId } from "@/features/projects/hooks/useProjectId";
import { TaskViewSwitcher } from "@/features/tasks/components/TaskViewSwitcher";
import { PencilIcon } from "lucide-react";
import Link from "next/link";


const ProjectIdClient = () => {
    const projectId = useProjectId();
    const { data, isLoading } = useGetProject({ projectId });
    if (isLoading) {
        return <PageLoader />
    }
    if (!data) {
        return <PageError message="Project not found" />
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar
                        name={data.name}
                        image={data?.imageUrl}
                        classname="size-8"
                    />
                    <p className="text-lg font-semibold">{data.name}</p>
                </div>
                <div className="">
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}>
                            <PencilIcon className="size-4 mr-2" />
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            <TaskViewSwitcher hideProjectFilters />
        </div>
    )
}

export default ProjectIdClient