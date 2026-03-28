import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@/shared/components/layout";
import { Typography } from "@/shared/components/texts";

export const DefaultHeader = () => {
  return (
    <AppBar
      component="header"
      position="sticky"
      color="inherit"
      elevation={0}
      className="border-b border-gray-200 bg-white/95 backdrop-blur-sm"
    >
      <Toolbar className="min-h-14 gap-2 sm:gap-4" disableGutters={false}>
        <Typography
          component={RouterLink}
          to="/accounts"
          variant="h6"
          className="font-semibold text-gray-900 no-underline hover:text-indigo-600"
          sx={{ textDecoration: "none" }}
        >
          Trivo
        </Typography>
        <Box className="hidden h-6 w-px bg-gray-200 sm:block" aria-hidden />
        <Typography
          variant="body2"
          color="text.secondary"
          component="span"
          className="hidden sm:inline"
        >
          Account settings
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
