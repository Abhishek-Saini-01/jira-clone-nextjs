import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.workspaces["$post"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;

export const useCreateWorkspace = () => {
   const router = useRouter();
   const queryClient = useQueryClient();
   const mutation = useMutation<
      ResponseType,
      Error,
      RequestType
   >({
      mutationFn: async ({ form }) => {
         const response = await client.api.workspaces["$post"]({ form });
         if (!response.ok) {
            throw new Error("Failed to create workspace")
         }
         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("Workspace created.")
         router.refresh();
         queryClient.invalidateQueries({ queryKey: ["workspaces"] });
         queryClient.invalidateQueries({ queryKey: ["workspace", data.$id!] });
      },
      onError: () => {
         toast.error("Failed to create workspace.")
      }
   })

   return mutation;
};

