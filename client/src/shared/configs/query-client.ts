import { STALE_TIME } from "@/shared/constants/query-client";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
    },
  },
});

export default queryClient;
