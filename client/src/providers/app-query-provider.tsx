import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/configs";

type AppQueryProviderProps = {
  children: ReactNode;
};

export const AppQueryProvider = ({ children }: AppQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
