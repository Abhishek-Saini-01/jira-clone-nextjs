import { getCurrent } from "@/features/auth/actions";
import CreateWorkspaceForm from "@/features/workspaces/components/CreateWorkspaceForm";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div>
      <p>This is a home page</p>
      <CreateWorkspaceForm />
    </div>
  );
}
