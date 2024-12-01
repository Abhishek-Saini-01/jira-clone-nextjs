
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { useConfirm } from "@/hooks/useConfirm";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteTask } from "../api/useDeleteTask";
import { useEditTaskModal } from "../hooks/useEditTaskModal";

interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode
}

const TaskActions = ({
    id,
    projectId,
    children
}: TaskActionsProps) => {

    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { open } = useEditTaskModal();

    const [
        ConfirmDialog,
        confirm
    ] = useConfirm(
        "Delete task",
        "This action cannot be undone",
        "destructive"
    );
    const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();
    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        deleteTask({ param: { taskId: id } }, {
            onSuccess: () => {
                router.refresh();
            }
        });
    }

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`);
    }
    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
    }

    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        onClick={onOpenTask}
                        className="font-medium p-[10px] cursor-pointer"
                    >
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                        Task Details
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={onOpenProject}
                        className="font-medium p-[10px] cursor-pointer"
                    >
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                        Open Project
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => open(id)}
                        disabled={false}
                        className="font-medium p-[10px] cursor-pointer"
                    >
                        <PencilIcon className="size-4 mr-2 stroke-2" />
                        Edit Task
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={onDelete}
                        disabled={isDeletingTask}
                        className="text-amber-700 focus:text-amber-700 p-[10px] cursor-pointer"
                    >
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TaskActions