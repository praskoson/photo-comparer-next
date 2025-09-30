import clsx from "clsx";

export function GridContainer({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function GridRow({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        className,
        "group/row relative isolate pt-[calc(--spacing(2)+1px)] last:pb-[calc(--spacing(2)+1px)]",
      )}
    >
      <div
        aria-hidden="true"
        className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen"
      >
        <div className="absolute inset-x-0 top-2 border-black/10 border-t"></div>
        <div className="absolute inset-x-0 bottom-2 hidden border-black/10 border-b group-last/row:block"></div>
      </div>
      {children}
    </div>
  );
}

export function PlusGridItem({
  className = "",
  children,
  selected,
}: {
  className?: string;
  children: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      data-selected={selected ? true : undefined}
      className={clsx(className, "group/item relative fill-black/25")}
    >
      <PlusGridIcon
        placement="top left"
        // className="_hidden group-first/item:block"
      />
      <PlusGridIcon placement="top right" />
      <PlusGridIcon
        placement="bottom left"
        // className="_hidden group-first/item:group-last/row:block"
      />
      <PlusGridIcon
        placement="bottom right"
        // className="_hidden group-last/row:block"
      />
      {children}
    </div>
  );
}

export function PlusGridIcon({
  className = "",
  placement,
}: {
  className?: string;
  placement: `${"top" | "bottom"} ${"right" | "left"}`;
}) {
  const [yAxis, xAxis] = placement.split(" ");

  const yClass = yAxis === "top" ? "-top-2" : "-bottom-2";
  const xClass = xAxis === "left" ? "-left-2" : "-right-2";

  return (
    <svg
      viewBox="0 0 15 15"
      aria-hidden="true"
      className={clsx(
        className,
        "absolute size-[15px] fill-inherit",
        yClass,
        xClass,
      )}
    >
      {placement === "top left" ? (
        <path d="M7 15H8V7H15V8H7V15Z" />
      ) : placement === "top right" ? (
        <path d="M8 15H7V7H0V8H8V15Z" />
      ) : placement === "bottom left" ? (
        <path d="M7 0H8V7H15V8H7V0Z" />
      ) : (
        <path d="M7 0H8V8H0V7H7V0Z" />
      )}
    </svg>
  );
}

// M715H8V7H15V8H7V15Z
// M7  0H8V7H15V8H7V0 Z
