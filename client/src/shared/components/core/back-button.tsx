import type { ComponentProps } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, IconButton } from "@/shared/components/buttons";
import { ArrowBackIcon } from "@/shared/components/icons";

type Props = ComponentProps<typeof Button> & {
  /** Explicit fallback path when there is no browser history to go back to. */
  fallback?: string;
};

const BackButton = ({ fallback, ...props }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const parentPath =
    fallback ?? (pathname.split("/").slice(0, -1).join("/") || "/");

  const handleClick = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(parentPath, { replace: true });
    }
  };

  return (
    <IconButton onClick={handleClick} aria-label="Go back" {...props}>
      <ArrowBackIcon aria-hidden />
    </IconButton>
  );
};

export default BackButton;
