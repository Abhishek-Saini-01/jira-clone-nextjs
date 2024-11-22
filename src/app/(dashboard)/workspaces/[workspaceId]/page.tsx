import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdPageProps {
    params: {
        workspaceId: string
    }
}
const WorkspaceIdPage = async ({
    params
}: WorkspaceIdPageProps) => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    const { workspaceId } = await params;

    return (
        <div>WorkspaceIdPage {workspaceId}</div>
    )
}

export default WorkspaceIdPage