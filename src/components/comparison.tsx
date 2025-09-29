import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useRef, useState } from "react";

export function Comparison({
  pSource,
  vSource,
  pCropped,
  vCropped,
}: {
  pSource: StaticImageData;
  vSource: StaticImageData;
  pCropped: StaticImageData | undefined;
  vCropped: StaticImageData | undefined;
}) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [hasLoadedP, setHasLoadedP] = useState(false);
  const [hasLoadedV, setHasLoadedV] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const slider = useMotionValue(50);
  const negativeSlider = useTransform(() => 100 - slider.get());
  const clipPath = useMotionTemplate`inset(0px ${negativeSlider}% 0px 0px)`;

  const setRef = useCallback((node: HTMLDivElement | null) => {
    constraintsRef.current = node;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const ready = hasLoadedP && hasLoadedV;

  return (
    <motion.div
      ref={setRef}
      data-ready={ready}
      dragMomentum={false}
      className="group relative my-4 w-full"
    >
      <div className="hidden group-data-[ready=false]:block">Učitavanje...</div>

      <div className="relative block">
        <Image
          src={pCropped ?? pSource}
          alt="iphone_12_photo"
          className="block h-auto w-full group-data-[ready=false]:invisible"
          onLoad={() => setHasLoadedP(true)}
        />
        <div className="absolute right-3 bottom-3 select-none bg-black/60 px-3 py-1 text-white backdrop-blur-md lg:py-2">
          <span className="font-semibold text-sm/6">
            iPhone 12 {pCropped ? " (Crop)" : ""}
          </span>
        </div>
      </div>

      <motion.div className="absolute inset-0 isolate" style={{ clipPath }}>
        <Image
          src={vCropped ?? vSource}
          alt="s23_ultra_photo"
          className="absolute inset-0 block h-auto w-full group-data-[ready=false]:invisible"
          onLoad={() => setHasLoadedV(true)}
        />
        <div className="absolute bottom-3 left-3 select-none bg-black/60 px-3 py-1 text-white backdrop-blur-md lg:py-2">
          <span className="font-semibold text-sm/6">
            S23 Ultra {vCropped ? " (Crop)" : ""}
          </span>
        </div>
      </motion.div>

      <motion.button
        drag="x"
        onDrag={(_, i) => {
          slider.set((i.point.x / containerWidth) * 100);
        }}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        className="absolute inset-x-0 inset-y-0 block w-4 cursor-ew-resize group-data-[ready=false]:hidden"
        style={{ left: "50%" }}
      >
        <div className="h-full w-2.5 bg-white/10 backdrop-blur-[4px] hover:bg-white/20" />
      </motion.button>
    </motion.div>
  );
}
