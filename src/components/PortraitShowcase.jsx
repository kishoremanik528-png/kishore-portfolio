import React, { useCallback } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { portfolio } from "../config/portfolio.js";

const portrait = {
  src: "/images/km-2.jpeg",
  alt: `${portfolio.fullName} wearing a navy suit and white shirt`,
};

const parallaxSpring = { stiffness: 145, damping: 22, mass: 0.55 };

export default function PortraitShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, parallaxSpring);
  const springY = useSpring(pointerY, parallaxSpring);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3.6, 3.6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [2.8, -2.8]);

  const handlePointerMove = useCallback(
    (event) => {
      if (shouldReduceMotion || event.pointerType !== "mouse") return;

      const bounds = event.currentTarget.getBoundingClientRect();
      pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
      pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    },
    [pointerX, pointerY, shouldReduceMotion],
  );

  const resetParallax = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <div className="portrait-showcase">
      <div className="portrait-gallery">
        <div className="portrait-gallery-layout">
          <motion.div
            className="portrait-card"
            style={shouldReduceMotion ? undefined : { rotateX, rotateY }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetParallax}
          >
            <motion.img
              className="portrait-image"
              src={portrait.src}
              alt={portrait.alt}
              draggable="false"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <span className="portrait-glass-edge" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
