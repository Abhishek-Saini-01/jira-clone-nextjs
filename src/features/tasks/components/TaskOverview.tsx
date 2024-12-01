import { Task } from '../types'

interface TaskOverviewProps {
    task: Task
}

const TaskOverview = ({
    task
}: TaskOverviewProps) => {
    return (
        <div>TaskOverview</div>
    )
}

export default TaskOverview