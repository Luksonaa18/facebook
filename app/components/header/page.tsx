"use client";
import { usePostStore } from "@/app/zustand1";
import { motion } from "framer-motion";
import { BsDoorOpen } from "react-icons/bs";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import messenger from "../../../public/mess.png";
import userImage from "../../../public/user.png";
import reels from "../../../public/reels.png";
import {
  FaSearch,
  FaUserFriends,
  FaFacebookMessenger,
  FaRegArrowAltCircleDown,
  FaArrowDown,
  FaUser,
} from "react-icons/fa";
import { IoMdNotificationsOutline, IoIosAddCircle } from "react-icons/io";
import { IoMenu, IoSettings } from "react-icons/io5";
import {
  MdOutlineConnectedTv,
  MdGroups,
  MdOutlineLiveTv,
} from "react-icons/md";
import { RiHome5Fill } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/fire";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [options, setOptions] = useState(false);
  const addpost = usePostStore((state) => state.posts);
  const [isClicked, setIsClicked] = useState("");
  const handleRedirect = (path: string) => {
    setIsClicked(path);
    router.push(path);
  };
  const handleMenuTrigger = () => {
    setOpen(!open);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
      router.push("/sign-in"); // redirect after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
        <div className="absolute top-15 left-12">
          {addpost.length > 0 && (
            <div className="w-[15px] h-[15px] flex items-center justify-center rounded-full bg-red-500 text-white">
              <span className="text-[10px]">{addpost.length}</span>
            </div>
          )}
        </div>
        <div className="flex felx-row w-full justify-evenly p-4 gap-3">
          <RiHome5Fill
            onClick={() => handleRedirect("/sign-in")}
            className={`text-2xl ${
              isClicked === "/home" ? "text-blue-600" : "text-gray-400"
            }`}
          />
          <FaUserFriends
            onClick={() => handleRedirect("/friends")}
            className="text-2xl text-gray-400"
          />
          <FaFacebookMessenger
            onClick={() => handleRedirect("/friends")}
            className="text-2xl text-gray-400"
          />
          <MdOutlineConnectedTv
            onClick={() => handleRedirect("/friends")}
            className="text-2xl text-gray-400"
          />
          <IoMdNotificationsOutline
            onClick={() => handleRedirect("/friends")}
            className="text-gray-400 text-2xl"
          />
          <CiShop
            onClick={() => handleRedirect("/friends")}
            className="text-2xl text-gray-400"
          />
        </div>
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
          className="w-full  bg-gray-100 absolute top-0  z-10"
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
          <motion.div className="w-full  flex flex-col p-4 gap-1 mt-15">
            <div className="flex bg-white w-full h-20 px-5 flex-row items-center justify-between rounded-2xl">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={userImage}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>Luka Zhozhadze</span>
              </div>
              <FaRegArrowAltCircleDown className="text-xl text-gray-400" />
            </div>
            <div className="flex bg-white w-full h-20 px-5 flex-row items-center justify-between rounded-2xl">
              <div className="flex flex-row items-center gap-2">
                <IoIosAddCircle
                  onClick={() => router.push("/sign-up")}
                  className="text-xl text-gray-400"
                />
                <span>Create new account</span>
              </div>
            </div>
          </motion.div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <Image src={reels} alt="Reels" width={30} />
              <p className="text-gray-500">Reels</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <Image
                src={messenger}
                alt="Messenger"
                className="rounded-full"
                width={30}
              />
              <p className="text-gray-500">Messages</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <MdGroups className="text-2xl text-blue-500" />
              <p className="text-gray-500">Groups</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <MdOutlineLiveTv className="text-2xl text-blue-500" />

              <p className="text-gray-500">Video</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.97 }}
              className={boxClass}
            >
              <div className="text-white bg-red-500 rounded-full w-12 flex items-center text-center justify-center h-auto font-semibold">
                LIVE
              </div>
              <p className="text-gray-500">Live videos</p>
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
              <motion.div
                animate={{ rotate: options ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaArrowDown
                  onClick={() => setOptions((prev) => !prev)}
                  className="cursor-pointer"
                />
              </motion.div>
            </div>
            <hr />

            {options && (
              <motion.div
                className="flex flex-col p-3 gap-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="flex flex-row items-center justify-start bg-white h-13 rounded-lg px-2 gap-4 shadow-sm"
                >
                  <FaUser className="text-2xl" />
                  <span>Settings</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="flex flex-row items-center justify-start bg-white h-13 rounded-lg px-2 gap-4 shadow-sm"
                >
                  <FaUser className="text-2xl" />
                  <span>Orders and payments</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="flex flex-row items-center justify-between bg-white h-13 rounded-lg px-2 gap-4 shadow-sm"
                >
                  <div className="flex flex-row gap-4">
                    <FaUser className="text-2xl" />
                    <span>Dark Mode</span>
                  </div>
                  <input type="checkbox" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="flex flex-row items-center justify-start bg-white h-13 rounded-lg px-2 gap-4 shadow-sm"
                >
                  <FaUser className="text-2xl" />
                  <span>Settings</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="flex flex-row items-center justify-start bg-white h-13 rounded-lg px-2 gap-4 shadow-sm"
                >
                  <FaUser className="text-2xl" />
                  <span>Settings</span>
                </motion.div>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              className="flex flex-row p-2 items-center gap-5 cursor-pointer"
              onClick={handleLogout}
            >
              <BsDoorOpen className="text-2xl text-gray-500" />
              <span>Log out</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
