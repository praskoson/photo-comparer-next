import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LShape } from "./l-shape";
import {
  ArrowsPointingOutIcon,
  GripHorizontalIcon,
  GripVerticalIcon,
  XMarkIcon,
} from "./svg";
import { useClickOutside } from "@/lib/hooks";

export function Comparison({
  pSource,
  vSource,
  pCropped,
  vCropped,
  orientation,
}: {
  pSource: StaticImageData;
  vSource: StaticImageData;
  pCropped: StaticImageData | undefined;
  vCropped: StaticImageData | undefined;
  orientation: "horizontal" | "vertical";
}) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [hasLoadedP, setHasLoadedP] = useState(false);
  const [hasLoadedV, setHasLoadedV] = useState(false);
  const x = useMotionValue(0);
  const [boundary, setBoundary] = useState(300);

  const clipPath = useTransform(
    x,
    [-boundary, boundary],
    orientation === "horizontal"
      ? ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const width = Math.min(
    (pCropped ?? pSource).width,
    (vCropped ?? vSource).width,
  );
  const height = Math.min(
    (pCropped ?? pSource).height,
    (vCropped ?? vSource).height,
  );
  const aspectRatio = width / height;
  const ready = hasLoadedP && hasLoadedV;

  useLayoutEffect(() => {
    if (constraintsRef.current) {
      if (orientation === "horizontal") {
        setBoundary(constraintsRef.current.clientWidth / 2);
      } else {
        setBoundary(constraintsRef.current.clientHeight / 2);
      }
    }
  }, [constraintsRef, orientation]);

  return (
    <div className="h-[calc(100dvh-54px-8px)] min-h-[260px] overflow-hidden px-1 md:px-4">
      <motion.div
        ref={constraintsRef}
        style={{ aspectRatio }}
        data-ready={ready}
        className="group relative mx-auto max-h-full"
      >
        <LShape placement="top right" />
        <LShape placement="top left" />
        <LShape placement="bottom left" />
        <LShape placement="bottom right" />

        {/* Loader */}
        <motion.div
          animate={
            ready
              ? {}
              : {
                  backgroundPosition: ["0px 0px", "40px 40px"],
                }
          }
          transition={{
            repeat: ready ? Infinity : 0,
            ease: "linear",
            duration: 6,
            repeatType: "loop",
          }}
          className="group-data-[ready=true]:hidden absolute inset-0 border-(--pattern-fg) border bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:24px_24px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5"
        />

        {/* Images */}
        <div style={{ aspectRatio }} className="relative size-full">
          <Image
            src={pCropped ?? pSource}
            alt="iphone_12_photo"
            className="size-full object-contain group-data-[ready=false]:invisible"
            onLoad={() => setHasLoadedP(true)}
          />
          <PhoneLabel photo={pSource} className="bottom-3 right-3">
            iPhone 12 {pCropped ? " (Crop)" : ""}
          </PhoneLabel>
        </div>
        <motion.div
          className="absolute inset-0 group-data-[ready=false]:invisible"
          style={{ clipPath }}
        >
          <Image
            src={vCropped ?? vSource}
            alt="s23_ultra_photo"
            className="size-full object-contain group-data-[ready=false]:invisible"
            onLoad={() => setHasLoadedV(true)}
          />
          <PhoneLabel
            photo={vSource}
            className={
              orientation === "horizontal" ? "bottom-3 left-3" : "top-3 right-3"
            }
          >
            S23 Ultra {vCropped ? " (Crop)" : ""}
          </PhoneLabel>
        </motion.div>

        <motion.button
          drag={orientation === "horizontal" ? "x" : "y"}
          dragMomentum={false}
          dragConstraints={constraintsRef}
          className={clsx(
            "absolute block group-data-[ready=false]:hidden",
            orientation === "horizontal"
              ? "cursor-ew-resize w-2.5 inset-y-0"
              : "cursor-ns-resize h-2.5 inset-x-0 flex flex-col",
          )}
          style={
            orientation === "horizontal"
              ? { x, left: "50%", transform: "translateX(-50%)" }
              : { y: x, top: "50%", transform: "translateY(-50%)" }
          }
        >
          {/* Touch target expander */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
          />

          {/* Visual grab handle */}
          <div
            className={clsx(
              "flex justify-center bg-white/10 backdrop-blur-[4px] hover:bg-white/20",
              orientation === "horizontal"
                ? "flex-col size-full"
                : "flex-row size-full",
            )}
          >
            {orientation === "horizontal" ? (
              <GripVerticalIcon className="text-white opacity-75" />
            ) : (
              <GripHorizontalIcon className="text-white opacity-75" />
            )}
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}

function PhoneLabel({
  children,
  className,
  photo,
}: {
  children: React.ReactNode;
  className?: string;
  photo: StaticImageData;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={clsx(
          "absolute px-2 py-1 group-data-[ready=false]:invisible md:px-3 md:py-2",
          "flex items-center select-none gap-x-2",
          "border-[0.5px] border-white/[0.05] backdrop-blur-md bg-black/30 text-white",
          className,
        )}
      >
        <ArrowsPointingOutIcon className="text-white size-4" />
        <span className="font-semibold text-xs md:text-sm/6">{children}</span>
      </motion.button>
      <AnimatePresence>
        {isOpen ? (
          <Dialog close={() => setIsOpen(false)}>
            <h2 className="sr-only">Source photo</h2>
            <Image
              placeholder="blur"
              className="size-full object-contain"
              src={photo}
              alt="Source photo"
            />
          </Dialog>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Dialog({
  close,
  children,
}: {
  close: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  /**
   * Use the dialog element's imperative API to open and close the dialog
   * when the component mounts and unmounts. This enables exit animations
   * and maintains the dialog's natural accessibility behaviour.
   */
  useEffect(() => {
    if (!ref.current) return;

    ref.current.showModal();

    return () => ref.current?.close();
  }, [ref]);

  useClickOutside(ref, close);

  return (
    <>
      <motion.div
        className="bg-black/65 fixed inset-0 z-[9999] backdrop-blur-xl"
        transition={{ duration: 0.14 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.dialog
        ref={ref}
        className="z-[10000] isolate  rounded-2xl relative inset-[20px] backdrop:hidden size-full bg-black focus:outline-none"
        open={false}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={close}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={close}
            aria-label="Close"
            className="z-10 focus:outline-none bg-white/10 backdrop-blur-sm rounded-full size-8 grid place-content-center"
          >
            <XMarkIcon className="text-white size-4" />
          </button>
        </div>
        {children}
      </motion.dialog>
    </>
  );
}
