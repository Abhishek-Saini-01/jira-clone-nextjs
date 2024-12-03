import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import WorkspaceIdClientPage from "./client";

const WorkspaceIdPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return <WorkspaceIdClientPage />
}

export default WorkspaceIdPage