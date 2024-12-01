import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import WorkspaceIdClientSetting from "../../../settings/client";

const ProjectIdSettingsPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");


    return <WorkspaceIdClientSetting />
}

export default ProjectIdSettingsPage