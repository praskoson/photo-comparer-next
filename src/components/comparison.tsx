import clsx from "clsx";
import { motion, useMotionValue, useTransform } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { LShape } from "./l-shape";
import { GripVerticalIcon } from "./svg";

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

  const width = Math.min((pCropped ?? pSource).width);
  const height = Math.min((pCropped ?? pSource).height);
  const aspectRatio = width / height;
  const ready = hasLoadedP && hasLoadedV;

  useLayoutEffect(() => {
    if (constraintsRef.current) {
      setBoundary(constraintsRef.current.clientWidth / 2);
    }
  }, [constraintsRef]);

  return (
    <div className="h-[calc(100vh-54px-8px)] overflow-hidden">
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
          className="group-data-[ready=true]:hidden absolute inset-1 border-(--pattern-fg) border bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:24px_24px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5"
        />

        {/* Images */}
        <div style={{ aspectRatio }} className="relative size-full">
          <Image
            src={pCropped ?? pSource}
            alt="iphone_12_photo"
            className="size-full object-contain group-data-[ready=false]:invisible"
            onLoad={() => setHasLoadedP(true)}
          />
          <PhoneLabel className="absolute bottom-3 right-3">
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
            className="w-full h-full object-contain group-data-[ready=false]:invisible"
            onLoad={() => setHasLoadedV(true)}
          />
          <PhoneLabel className="absolute bottom-3 left-3">
            S23 Ultra {vCropped ? " (Crop)" : ""}
          </PhoneLabel>
        </motion.div>

        <motion.button
          drag="x"
          dragMomentum={false}
          dragConstraints={constraintsRef}
          className="absolute inset-x-0 inset-y-0 block w-11 cursor-ew-resize group-data-[ready=false]:hidden"
          style={{ x, left: "50%", transform: "translateX(-50%)" }}
        >
          <div className="flex h-full w-2.5 flex-col justify-center bg-white/10 backdrop-blur-[4px] hover:bg-white/20">
            <GripVerticalIcon className="text-white opacity-75" />
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}

function PhoneLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "absolute bottom-3 px-2 py-1 group-data-[ready=false]:invisible md:px-3 md:py-2",
        "flex items-center select-none",
        "border-[0.5px] border-white/[0.05] backdrop-blur-md bg-black/30 text-white",
        className,
      )}
    >
      <span className="font-semibold text-xs md:text-sm/6">{children}</span>
    </div>
  );
}
