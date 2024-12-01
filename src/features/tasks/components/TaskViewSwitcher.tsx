"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import DataKanban from "@/features/tasks/components/DataKanban";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
import { useBulkUpdateTasks } from "../api/useBulkUpdateTasks";
import { useGetTasks } from "../api/useGetTasks";
import { useCreateTaskModal } from "../hooks/useCreateTaskModal";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { TaskStatus } from "../types";
import { columns } from "./columns";
import DataCalender from "./DataCalender";
import DataFilters from "./DataFilters";
import { DataTable } from "./DataTable";

interface TaskViewSwitcherProps {
    hideProjectFilters?: boolean;
}

export const TaskViewSwitcher = ({
    hideProjectFilters
}: TaskViewSwitcherProps) => {
    const [{
        status,
        assigneeId,
        dueDate,
        projectId,
        search
    }] = useTaskFilters();

    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table"
    });
    const workspaceId = useWorkspaceId();
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
        workspaceId,
        assigneeId,
        dueDate,
        projectId,
        search,
        status
    })
    const { open } = useCreateTaskModal();
    const { mutate: bulkUpdate } = useBulkUpdateTasks();

    const onKandanChange = useCallback((
        tasks: {
            $id: string;
            status: TaskStatus;
            position: number;
        }[]
    ) => {
        bulkUpdate({
            json: { tasks }
        })
    }, [bulkUpdate])

    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}
            className="flex-1 w-full border rounded-lg"
        >
            <div className="h-full flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="table"
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="kanban"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="calendar"
                        >
                            Calender
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size="sm"
                        className="w-full lg:w-auto"
                    >
                        <PlusIcon className="size-4 mr-2" />
                        New
                    </Button>
                </div>
                <DottedSeparator classname="my-4" />
                <DataFilters hideProjectFilter={hideProjectFilters} />
                <DottedSeparator classname="my-4" />
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0">
                            <DataTable
                                columns={columns}
                                data={tasks?.documents ?? []}
                            />
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            <DataKanban
                                data={tasks?.documents ?? []}
                                onChange={onKandanChange}
                            />
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0 h-full pb-4">
                            <DataCalender data={tasks?.documents ?? []} />
                        </TabsContent>
                    </>
                )}
            </div>
        </Tabs>
    )
}
