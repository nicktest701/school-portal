import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedContainer = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Start fully transparent and 50px below
        animate={{ opacity: 1, y: 0 }} // Fade in and move to the original position
        transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
        exit={{ y: -20, opacity: 0 }}
        // className='hide-on-print'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
AnimatedContainer.propTypes = {
  children: PropTypes.node,
};

export default AnimatedContainer;
