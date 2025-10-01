import clsx from "clsx";
import { motion } from "motion/react";

export function NavButton({
  children,
  className,
  onClick,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  label?: string;
}) {
  return (
    <motion.button
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "block size-full transition-[scale] duration-1000 hover:bg-white/15",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
