import clsx from "clsx";

export function LShape({
  className = "",
  placement,
}: {
  className?: string;
  placement: `${"top" | "bottom"} ${"right" | "left"}`;
}) {
  const [yAxis, xAxis] = placement.split(" ");
  const yClass = yAxis === "top" ? "top-0" : "bottom-0";
  const xClass = xAxis === "left" ? "left-0" : "right-0";

  return (
    <svg
      viewBox="0 0 15 15"
      aria-hidden="true"
      strokeWidth={2}
      className={clsx(
        className,
        "absolute size-5 md:size-7 fill-zinc-500",
        yClass,
        xClass,
      )}
    >
      {placement === "top left" ? (
        <path d="M0 0V8H1V1H8V0" />
      ) : placement === "top right" ? (
        <path d="M15 0V8H14V1H7V0Z" />
      ) : placement === "bottom left" ? (
        <path d="M0 7V15H8V14H1V7Z" />
      ) : (
        <path d="M15 7V15H7V14H14V7Z" />
      )}
    </svg>
  );
}
