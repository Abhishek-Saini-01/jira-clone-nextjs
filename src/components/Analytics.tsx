import { ProjectAnalyticsResponseType } from "@/features/projects/api/useGetProjectAnalytics";
import AnalyticsCard from "./AnalyticsCard";
import DottedSeparator from "./DottedSeparator";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";


const Analytics = ({
    data
}: ProjectAnalyticsResponseType) => {

    return (
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row">
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Total Tasks"
                        value={data.taskCount}
                        increaseValue={data.taskDifference}
                        varient={data.taskDifference > 0 ? "up" : "down"}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Assigned Tasks"
                        value={data.assignedTaskCount}
                        increaseValue={data.assignedTaskDifference}
                        varient={data.assignedTaskDifference > 0 ? "up" : "down"}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Completed Tasks"
                        value={data.completedTaskCount}
                        increaseValue={data.completedTaskCountDifference}
                        varient={data.completedTaskCountDifference > 0 ? "up" : "down"}
                    />
                    <DottedSeparator direction="vertical" />

                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Overdue Tasks"
                        value={data.overdueTaskCount}
                        increaseValue={data.overdueTaskCountDifference}
                        varient={data.overdueTaskCountDifference > 0 ? "up" : "down"}
                    />
                    <DottedSeparator direction="vertical" />

                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Incompleted Tasks"
                        value={data.incompleteTaskCount}
                        increaseValue={data.incompleteTaskCountDifference}
                        varient={data.incompleteTaskCountDifference > 0 ? "up" : "down"}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default Analytics