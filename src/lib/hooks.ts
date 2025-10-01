import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLDialogElement | null>,
  close: VoidFunction,
) {
  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent<Element>) => {
      if (ref.current && checkClickOutside(event, ref.current)) {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside as any);

    return () => {
      document.removeEventListener("click", handleClickOutside as any);
    };
  }, [ref]);
}

function checkClickOutside(
  event: React.MouseEvent<Element>,
  element: HTMLDialogElement,
) {
  const { top, left, width, height } = element.getBoundingClientRect();

  if (
    event.clientX < left ||
    event.clientX > left + width ||
    event.clientY < top ||
    event.clientY > top + height
  ) {
    return true;
  }
}
