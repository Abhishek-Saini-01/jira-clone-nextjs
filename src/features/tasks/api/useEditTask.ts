import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"], 200>
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>;

export const useEditTask = () => {
   const queryClient = useQueryClient();
   const mutation = useMutation<
      ResponseType,
      Error,
      RequestType
   >({
      mutationFn: async ({ param, json }) => {
         const response = await client.api.tasks[":taskId"]["$patch"]({ param, json });
         if (!response.ok) {
            throw new Error("Failed to edit task")
         }
         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("Task edited.")
         queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
         queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
         queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
      },
      onError: () => {
         toast.error("Failed to edit task.")
      }
   })

   return mutation;
};

