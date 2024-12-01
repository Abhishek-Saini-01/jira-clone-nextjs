import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEditTask } from "../api/useEditTask";
import { Task } from "../types";

interface TaskDescriptionProps {
    task: Task;
}
const TaskDescription = ({
    task
}: TaskDescriptionProps) => {
    const router = useRouter();
    const { mutate: updateTask, isPending: isUpdatingTask } = useEditTask();

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.description);

    const handleSave = () => {
        updateTask({
            json: { description: value },
            param: { taskId: task.$id },
        }, {
            onSuccess: () => {
                router.refresh();
            }
        })
    }

    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Overview</p>
                <Button onClick={() => setIsEditing((prev) => !prev)} size="sm" variant="secondary">
                    {isEditing ? (
                        <XIcon className="size-4 mr-2" />
                    ) : (
                        <PencilIcon className="size-4 mr-2" />
                    )}
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <DottedSeparator classname="my-4" />
            {isEditing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea
                        placeholder="Add a description"
                        value={value}
                        rows={4}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={isUpdatingTask}
                    />
                    <Button
                        size="sm"
                        className="w-fit ml-auto"
                        onClick={handleSave}
                        disabled={isUpdatingTask}
                    >
                        {isUpdatingTask ? "Saving" : "Save Changes"}
                    </Button>
                </div>
            ) : (
                <div className="">
                    {task.description || (
                        <span className="text-muted-foreground">
                            No description set
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default TaskDescription