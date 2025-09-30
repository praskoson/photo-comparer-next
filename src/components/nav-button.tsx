import clsx from "clsx";

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
    <button
      aria-label={label}
      onClick={onClick}
      className={clsx(
        "block size-full transition-[scale] duration-1000 hover:bg-white/15 active:scale-[0.97]",
        className,
      )}
    >
      {children}
    </button>
  );
}
