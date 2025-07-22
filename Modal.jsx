import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.4)" },
  tap: { scale: 0.95 }
};

const Modal = ({ showModal, message, onClose }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-2xl max-w-sm w-full text-center border border-cyan-500 animate-pulse-border">
            <p className="text-xl font-semibold mb-6 text-cyan-300">{message}</p>
            <motion.button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-orange-600 text-white rounded-full hover:from-cyan-700 hover:to-orange-700 transition duration-300 transform hover:scale-105 shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Acknowledge
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
