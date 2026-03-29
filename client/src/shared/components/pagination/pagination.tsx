import {
  Pagination as MuiPagination,
  type PaginationProps as MuiPaginationProps,
} from "@mui/material";

export type PaginationProps = MuiPaginationProps;

/**
 * MUI {@link MuiPagination} with project defaults (rounded, first/last, primary).
 */
const Pagination = ({
  color = "primary",
  shape = "rounded",
  showFirstButton = true,
  showLastButton = true,
  siblingCount = 1,
  boundaryCount = 1,
  ...props
}: PaginationProps) => {
  return (
    <MuiPagination
      color={color}
      shape={shape}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      siblingCount={siblingCount}
      boundaryCount={boundaryCount}
      {...props}
    />
  );
};

export default Pagination;
