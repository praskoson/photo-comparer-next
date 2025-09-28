import Image, { type StaticImageData } from 'next/image'
import { useCallback, useRef, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'motion/react'

export function Comparison({
  pPhoto,
  vPhoto,
}: {
  pPhoto: StaticImageData
  vPhoto: StaticImageData
}) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [hasLoadedP, setHasLoadedP] = useState(false)
  const [hasLoadedV, setHasLoadedV] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const slider = useMotionValue(50)
  const negativeSlider = useTransform(() => 100 - slider.get())
  const clipPath = useMotionTemplate`inset(0px ${negativeSlider}% 0px 0px)`

  const setRef = useCallback((node: HTMLDivElement | null) => {
    constraintsRef.current = node
    if (!node) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const ready = hasLoadedP && hasLoadedV

  return (
    <motion.div
      ref={setRef}
      data-ready={ready}
      dragMomentum={false}
      className="my-4 group relative w-full"
    >
      <div className="group-data-[ready=false]:block hidden">Učitavanje...</div>
      <Image
        src={pPhoto}
        alt="iphone_12_photo"
        className="group-data-[ready=false]:invisible block w-full h-auto"
        onLoad={() => setHasLoadedP(true)}
      />
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <Image
          src={vPhoto}
          alt="s23_ultra_photo"
          className="absolute inset-0 group-data-[ready=false]:invisible block w-full h-auto"
          onLoad={() => setHasLoadedV(true)}
        />
      </motion.div>

      <motion.button
        drag="x"
        onDrag={(_, i) => {
          slider.set((i.point.x / containerWidth) * 100)
        }}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        className="group-data-[ready=false]:hidden block absolute inset-y-0 inset-x-0 w-4 cursor-ew-resize"
        style={{ left: '50%' }}
      >
        <div className="h-full bg-white/10 hover:bg-white/20 w-2.5 backdrop-blur-[4px]" />
      </motion.button>
    </motion.div>
  )
}
