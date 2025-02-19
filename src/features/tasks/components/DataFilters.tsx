"use client";

import { useGetMembers } from "@/features/members/api/useGetMembers";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import DatePicker from "@/components/DatePicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    FolderIcon,
    ListCheckIcon,
    UserIcon
} from "lucide-react";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { TaskStatus } from "../types";


interface DataFiltersProps {
    hideProjectFilter?: boolean;
}
const DataFilters = ({
    hideProjectFilter
}: DataFiltersProps) => {
    const workspaceId = useWorkspaceId();
    const { data: projects, isLoading: isProjectLoading } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId });

    const isLoading = isProjectLoading || isMembersLoading;
    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name
    }))
    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name
    }))
    const [{
        status,
        assigneeId,
        dueDate,
        projectId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        search
    }, setFilters] = useTaskFilters();

    const onStatusChange = (value: string) => {
        if (value === "all") {
            setFilters({ status: null })
        } else {
            setFilters({ status: value as TaskStatus })
        }
    }
    const onAssigneChange = (value: string) => {
        if (value === "all") {
            setFilters({ assigneeId: null })
        } else {
            setFilters({ assigneeId: value as string })
        }
    }
    const onProjectChange = (value: string) => {
        if (value === "all") {
            setFilters({ projectId: null })
        } else {
            setFilters({ projectId: value as string })
        }
    }

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListCheckIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All statuses" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator />
                    <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                    <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                </SelectContent>
            </Select>
            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All assignees" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All assignees</SelectItem>
                    <SelectSeparator />
                    {memberOptions?.map((member) => (
                        <SelectItem
                            key={member.value}
                            value={member.value}
                        >{member.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {!hideProjectFilter && (
                <Select
                    defaultValue={projectId ?? undefined}
                    onValueChange={(value) => onProjectChange(value)}
                >
                    <SelectTrigger className="w-full lg:w-auto h-8">
                        <div className="flex items-center pr-2">
                            <FolderIcon className="size-4 mr-2" />
                            <SelectValue placeholder="All projects" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All projects</SelectItem>
                        <SelectSeparator />
                        {projectOptions?.map((project) => (
                            <SelectItem
                                key={project.value}
                                value={project.value}
                            >{project.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            <DatePicker
                placeholder="Due Date"
                classname="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => {
                    setFilters({ dueDate: date ? date.toISOString() : null });
                }}
            />
        </div>
    )
}

export default DataFilters