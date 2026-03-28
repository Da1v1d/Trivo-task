import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@/shared/components/layout";
import { Text } from "@/shared/components/texts";
import trivoLogo from "@/assets/icons/trivo-logo.png";

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
        <Text
          component={RouterLink}
          to="https://www.trivo.am"
          target="_blank"
          rel="noopener noreferrer"
          variant="h6"
          className="font-semibold text-gray-900 no-underline"
          aria-label="Trivo"
          sx={{ textDecoration: "none" }}
        >
          <img src={trivoLogo} alt="Trivo" className="w-16" />
        </Text>
        <Box className="hidden h-6 w-px bg-gray-200 sm:block" aria-hidden />
        <Text
          variant="body2"
          color="text.secondary"
          component="span"
          className="hidden sm:inline"
        >
          Account settings
        </Text>
      </Toolbar>
    </AppBar>
  );
};
