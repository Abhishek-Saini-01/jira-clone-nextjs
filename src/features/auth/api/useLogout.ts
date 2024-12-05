import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
   const router = useRouter();

   const queryClient = useQueryClient();

   const mutation = useMutation<
      ResponseType,
      Error
   >({
      mutationFn: async () => {
         const response = await client.api.auth.logout["$post"]();
         return await response.json();
      },
      onSuccess: () => {
         // window.location.reload();
         toast.success("Logged-out");
         router.refresh();
         queryClient.invalidateQueries();
      }
   })

   return mutation;
};

