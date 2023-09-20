import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const AnimatedContainer = ({ children }) => {
  return (
    <AnimatePresence mode='sync'>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.1 }}
        
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
