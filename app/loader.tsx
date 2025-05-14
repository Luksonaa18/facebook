import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/fire";
const Loader = () => {
  const [isLoading] = useState(false);
  const [loading] = useAuthState(auth);
  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-white z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
            transition: {
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            },
          }}
        >
          <FaFacebook className="text-blue-600 text-6xl" />
        </motion.div>
      </motion.div>
    );
  }
  return (
    <>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
              transition: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              },
            }}
          >
            <FaFacebook className="text-blue-600 text-6xl" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
export default Loader;
