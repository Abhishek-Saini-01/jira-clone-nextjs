import { getCurrent } from "@/features/auth/actions";
import UserButton from "@/features/auth/components/UserButton";
import { redirect } from "next/navigation";

export default  async function Home() {
   const user = await getCurrent();
   if(!user) redirect("/sign-in");

  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center">
      <p className="w-fit text-2xl font-semibold text-blue-600">Only visiable to authenticated users</p>
      <UserButton />
    </div>
  );
}
