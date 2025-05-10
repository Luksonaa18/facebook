"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useThemeStore } from "../zustand";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(false);
  const { toggleDarkMode, darkMode } = useThemeStore();
  const handleMenuTrigger = () => {
    setOpen(!open);
  };

  const boxClass =
    "flex flex-col items-start justify-start p-4 h-[100px] bg-white shadow-md rounded";

  return (
    <>
      <header>
        <nav>
          <div className="flex p-2 flex-row items-center justify-between">
            <h1 className="text-3xl text-blue-600 font-bold">facebook</h1>
            <div className="flex flex-row items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-2xl cursor-pointer"
              >
                <FaSearch />
              </motion.div>
              <IoMenu
                onClick={handleMenuTrigger}
                className="text-2xl cursor-pointer"
              />
            </div>
          </div>
        </nav>
      </header>

      {open && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            bounce: 0.3,
          }}
          className="w-full h-screen bg-gray-100 absolute top-0 overflow-y-auto"
        >
          <motion.div
            className="fixed top-0 w-full h-16 bg-white flex items-center p-4 shadow-md z-10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BiArrowBack
              onClick={() => setOpen(false)}
              className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <h1 className="ml-4">Menu</h1>
          </motion.div>

          <div className="mt-20 p-4 grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <h1 className="text-gray-700 font-semibold">Image</h1>
              <p className="text-gray-500">Reels</p>
            </motion.div>
          </div>
          <div className="flex flex-col">
            <hr />
            <div className="flex p-2 flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-1.5 h-16">
                <IoSettings className="text-4xl text-gray-500" />
                <span>Settings & privacy</span>
              </div>
              <FaArrowDown onClick={() => setOptions((prev) => !prev)} />
            </div>
            {options && (
              <div className="flex flex-col p-3 gap-4">
                <div className="flex flex-row items-center justify-start bg-white h-13 rounded-lg px-2 gap-4">
                  <FaUser className="text-2xl" />
                  <span>Settings</span>
                </div>
                <div className="flex flex-row items-center justify-start bg-white h-13 rounded-lg px-2 gap-4">
                  <FaUser className="text-2xl" />
                  <span>Orders and payments</span>
                </div>
                <div className="flex flex-row items-center justify-between bg-white h-13 rounded-lg px-2 gap-4">
                  <div className="flex flex-row gap-4">
                    <FaUser className="text-2xl" />
                    <span>Dark More</span>
                  </div>
                  <input type="checkbox" name="" id="" />
                </div>
                <div className="flex flex-row items-center justify-start bg-white h-13 rounded-lg px-2 gap-4">
                  <FaUser className="text-2xl" />
                  <span>Settings</span>
                </div>
                <div className="flex flex-row items-center justify-start bg-white h-13 rounded-lg px-2 gap-4">
                  <FaUser className="text-2xl" />
                  <span>Settings</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Dashboard;
