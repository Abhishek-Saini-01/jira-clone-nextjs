import { getCurrent } from "@/features/auth/queries";
import JoinWorkspaceForm from "@/features/workspaces/components/JoinWorkspaceForm";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface WorkspaceIdJoinPageProps {
  params: {
      workspaceId: string
  }
}
const WorkspaceIdJoinPage = async ({
  params
}:WorkspaceIdJoinPageProps) => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in")
  }

  const initialValues = await getWorkspaceInfo({workspaceId: params.workspaceId})
  if(!initialValues){
    toast.error("No workspace found!")
    redirect("/")
  }
  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm 
        initialValues={initialValues}
      />
    </div>
  )
}

export default WorkspaceIdJoinPage