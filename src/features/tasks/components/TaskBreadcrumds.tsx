import { Button } from "@/components/ui/button";
import ProjectAvatar from "@/features/projects/components/ProjectAvatar";
import { Project } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { useConfirm } from "@/hooks/useConfirm";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeleteTask } from "../api/useDeleteTask";
import { Task } from "../types";

interface TaskBreadcrumdsProps {
    project: Project;
    task: Task;
}


const TaskBreadcrumds = ({
    project,
    task
}: TaskBreadcrumdsProps) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { mutate, isPending } = useDeleteTask();
    const [ConfrimDialog, confirm] = useConfirm(
        "Delete task",
        "This action cannot be undone",
        "destructive"
    );
    const handleDeleteTask = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({ param: { taskId: task.$id } }, {
            onSuccess: () => {
                router.push(`/worskspaces/${workspaceId}/tasks`)
            }
        })
    }
    return (
        <div className="flex items-center gap-x-2">
            <ConfrimDialog />
            <ProjectAvatar
                name={project.name}
                image={project.imageUrl}
                classname="size-6 lg:size-8"
            />
            <Link href={`/workspaces/${workspaceId}/pojects/${project.$id}`}>
                <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">{project.name}</p>
            </Link>
            <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
            <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
            <Button
                onClick={handleDeleteTask}
                disabled={isPending}
                className="ml-auto"
                variant="destructive"
                size="sm"
            >
                <TrashIcon className="size-4 lg:mr-2" />
                <span className="hidden lg:block" >Delete Task</span>
            </Button>

        </div>
    )
}

export default TaskBreadcrumds