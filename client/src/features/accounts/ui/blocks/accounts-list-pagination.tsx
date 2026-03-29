import { Box } from "@/shared/components/layout";
import { Pagination } from "@/shared/components/pagination";

type Props = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

const AccountsListPagination = ({
  page,
  pageCount,
  onPageChange,
  disabled,
  className = "px-4 py-3 border-t border-gray-100 bg-slate-50/50",
}: Props) => {
  if (pageCount <= 1) {
    return null;
  }

  const handleChange = (_: React.ChangeEvent<unknown>, page: number): void => {
    onPageChange(page);
  };

  return (
    <Box
      className={`flex flex-wrap items-center justify-center gap-2 sm:justify-end ${className}`}
    >
      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChange}
        disabled={disabled}
        aria-label="Accounts list pages"
      />
    </Box>
  );
};

export default AccountsListPagination;
