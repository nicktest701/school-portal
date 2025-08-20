import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedContainer = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.35,
            ease: [0.33, 1, 0.68, 1],
            scale: { duration: 0.25 },
          },
        }}
        exit={{
          opacity: 0,
          y: -10,
          transition: {
            duration: 0.2,
            ease: [0.33, 0, 0.67, 1],
          },
        }}
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 120,
          mass: 0.5,
          restDelta: 0.001,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedContainer;
