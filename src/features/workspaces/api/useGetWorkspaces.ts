import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWorkspces = () => {
   const query = useQuery({
      queryKey: ["workspace"],
      queryFn: async () => {
         const response = await client.api.workspaces["$get"]();
         if (!response.ok) {
            throw new Error("Failed to get workspaces");
         }

         const { data } = await response.json();
         return data;
      }
   })

   return query;
};

