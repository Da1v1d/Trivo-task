import { Outlet } from "react-router-dom";
import { Box } from "@/shared/components/layout";
import { DefaultHeader } from "@/shared/components/core/default-header";

export const PageLayout = () => {
  return (
    <Box className="flex min-h-svh flex-col bg-slate-50">
      <DefaultHeader />
      <Box component="main" className="flex-1" id="main-content">
        <Outlet />
      </Box>
    </Box>
  );
};
