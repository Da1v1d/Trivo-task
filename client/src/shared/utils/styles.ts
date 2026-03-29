// here we need to have something like twMerge from tailwind-merge with clsx
export const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
