"use client";
import { usePostStore } from "@/app/zustand1";
import { AnimatePresence, motion } from "framer-motion";
import { BsDoorOpen } from "react-icons/bs";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import messenger from "../../../public/mess.png";
import userImage from "../../../public/user.png";
import reels from "../../../public/reels.png";
import { BsPostcardFill } from "react-icons/bs";
import event from "../../../public/even.png";
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
import { FaFacebook, FaImages } from "react-icons/fa6";
import { CgMenuGridO } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

type FormData = {
  comment: string;
};

const Header = () => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [makePost, setMakePost] = useState(false);
  const [menubar, setMenuBar] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const [options, setOptions] = useState(false);
  const addpost = usePostStore((state) => state.posts);
  const [isClicked, setIsClicked] = useState("/");
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
  const handlePostAdd = (data: FormData) => {
    const newPost = {
      author: "John Doe",
      comment: data.comment,
      date: new Date(),
      image: selectedImage,
      id:uuidv4()
    };

    addPost(newPost);
    setSelectedImage(null);
    reset();
    setMakePost(false);
  };

  const boxClass =
    "flex flex-col items-start justify-start p-4 h-24 bg-white shadow-sm rounded-lg";
  const { addPost, posts } = usePostStore();

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-white shadow-md sticky top-0 z-30 lg:hidden">
        <nav className="px-4 py-2">
          <div className="flex items-center justify-between">
            <FaFacebook className="text-blue-600 text-4xl" />
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 rounded-full p-2">
                <FaSearch className="text-gray-600 text-lg" />
              </div>
              <div
                className="bg-gray-100 rounded-full p-2"
                onClick={handleMenuTrigger}
              >
                <IoMenu className="text-gray-600 text-lg" />
              </div>
            </div>
          </div>
        </nav>
        <div className="flex justify-around border-t border-gray-200 py-2 bg-white">
          <div
            onClick={() => handleRedirect("/")}
            className={`flex flex-col items-center ${
              isClicked === "/" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <RiHome5Fill className="text-2xl" />
            <span className="text-xs mt-1">
              {isClicked === "/" && (
                <div className="w-6 h-0.5 bg-blue-600"></div>
              )}
            </span>
          </div>
          <div
            onClick={() => handleRedirect("/friends")}
            className={`flex flex-col items-center ${
              isClicked === "/friends" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <FaUserFriends className="text-2xl" />
            <span className="text-xs mt-1">
              {isClicked === "/friends" && (
                <div className="w-6 h-0.5 bg-blue-600"></div>
              )}
            </span>
          </div>
          <div
            onClick={() => handleRedirect("/watch")}
            className={`flex flex-col items-center ${
              isClicked === "/watch" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <MdOutlineConnectedTv className="text-2xl" />
            <span className="text-xs mt-1">
              {isClicked === "/watch" && (
                <div className="w-6 h-0.5 bg-blue-600"></div>
              )}
            </span>
          </div>
          <div
            onClick={() => handleRedirect("/marketplace")}
            className={`flex flex-col items-center ${
              isClicked === "/marketplace" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <CiShop className="text-2xl" />
            <span className="text-xs mt-1">
              {isClicked === "/marketplace" && (
                <div className="w-6 h-0.5 bg-blue-600"></div>
              )}
            </span>
          </div>
          <div
            onClick={() => handleRedirect("/notifications")}
            className={`flex flex-col items-center ${
              isClicked === "/notifications" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <div className="relative">
              <IoMdNotificationsOutline className="text-2xl" />
              {addpost.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">
                    {addpost.length > 9 ? "9+" : addpost.length}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs mt-1">
              {isClicked === "/notifications" && (
                <div className="w-6 h-0.5 bg-blue-600"></div>
              )}
            </span>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-sm sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-2 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <FaFacebook className="text-blue-600 text-4xl" />
            <div className="relative">
              <FaSearch className="text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search Facebook"
                className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-60 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            <div
              onClick={() => handleRedirect("/")}
              className={`px-10 py-3 rounded-lg hover:bg-gray-100 cursor-pointer relative ${
                isClicked === "/" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <RiHome5Fill className="text-2xl mx-auto" />
              {isClicked === "/" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </div>
            <div
              onClick={() => handleRedirect("/friends")}
              className={`px-10 py-3 rounded-lg hover:bg-gray-100 cursor-pointer relative ${
                isClicked === "/friends" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <FaUserFriends className="text-2xl mx-auto" />
              {isClicked === "/friends" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </div>
            <div
              onClick={() => handleRedirect("/watch")}
              className={`px-10 py-3 rounded-lg hover:bg-gray-100 cursor-pointer relative ${
                isClicked === "/watch" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <MdOutlineConnectedTv className="text-2xl mx-auto" />
              {isClicked === "/watch" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </div>
            <div
              onClick={() => handleRedirect("/marketplace")}
              className={`px-10 py-3 rounded-lg hover:bg-gray-100 cursor-pointer relative ${
                isClicked === "/marketplace" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <CiShop className="text-2xl mx-auto" />
              {isClicked === "/marketplace" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </div>
            <div
              onClick={() => handleRedirect("/groups")}
              className={`px-10 py-3 rounded-lg hover:bg-gray-100 cursor-pointer relative ${
                isClicked === "/groups" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <MdGroups className="text-2xl mx-auto" />
              {isClicked === "/groups" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div
              onClick={() => setMenuBar(!menubar)}
              className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300"
            >
              <CgMenuGridO className="text-xl text-gray-700" />
            </div>
            <div className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300">
              <FaFacebookMessenger className="text-xl text-gray-700" />
            </div>
            <div className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300 relative">
              <IoMdNotificationsOutline className="text-xl text-gray-700" />
              {addpost.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">
                    {addpost.length > 9 ? "9+" : addpost.length}
                  </span>
                </div>
              )}
            </div>
            <div onClick={() => setLogOut(!logOut)} className="cursor-pointer">
              <Image
                src={userImage}
                alt="user"
                width={40}
                height={40}
                className="rounded-full border border-gray-300"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Menu Overlay - Mobile */}
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed inset-0 bg-white z-50 overflow-y-auto pb-16"
        >
          <div className="fixed top-0 w-full bg-white flex items-center p-4 border-b">
            <BiArrowBack
              onClick={() => setOpen(false)}
              className="text-2xl mr-4 cursor-pointer"
            />
            <h1 className="text-xl font-semibold">Menu</h1>
          </div>

          <div className="mt-16 px-4">
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <Image
                    src={userImage}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-xs text-gray-500">View your profile</p>
                  </div>
                </div>
                <FaRegArrowAltCircleDown className="text-gray-500" />
              </div>

              <div className="p-4 flex items-center gap-3 border-b">
                <div className="bg-gray-100 rounded-full p-2">
                  <IoIosAddCircle className="text-xl text-blue-600" />
                </div>
                <p>Create new account</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: (
                    <Image
                      src={messenger}
                      alt="Messenger"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  ),
                  name: "Messages",
                },
                {
                  icon: (
                    <Image src={reels} alt="Reels" width={30} height={30} />
                  ),
                  name: "Reels",
                },
                {
                  icon: <MdGroups className="text-2xl text-blue-500" />,
                  name: "Groups",
                },
                {
                  icon: <MdOutlineLiveTv className="text-2xl text-blue-500" />,
                  name: "Video",
                },
                {
                  icon: (
                    <div className="text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                      LIVE
                    </div>
                  ),
                  name: "Live videos",
                },
                {
                  icon: <CiShop className="text-2xl text-blue-500" />,
                  name: "Marketplace",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-2"
                >
                  {item.icon}
                  <p className="text-sm text-gray-700">{item.name}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div
                className="flex items-center justify-between p-2"
                onClick={() => setOptions(!options)}
              >
                <div className="flex items-center gap-3">
                  <IoSettings className="text-2xl text-gray-500" />
                  <span className="font-medium">Settings & privacy</span>
                </div>
                <motion.div animate={{ rotate: options ? 180 : 0 }}>
                  <FaArrowDown className="text-gray-500" />
                </motion.div>
              </div>

              {options && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 pl-10 mt-2"
                >
                  {[
                    "Settings",
                    "Privacy Checkup",
                    "Privacy Center",
                    "Activity Log",
                    "Feed Preferences",
                    "Language",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="p-2 rounded-md hover:bg-gray-100"
                    >
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              <motion.div
                whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                className="flex items-center gap-3 p-3 rounded-md mt-4"
                onClick={handleLogout}
              >
                <BsDoorOpen className="text-2xl text-gray-500" />
                <span className="font-medium">Log out</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Profile Dropdown - Desktop */}
      {logOut && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 right-4 z-40 w-80 bg-white rounded-lg shadow-lg"
        >
          <div className="p-3 border-b hover:bg-gray-100 rounded-t-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <Image
                src={userImage}
                alt="user"
                width={50}
                height={50}
                className="rounded-full border border-gray-300"
              />
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-xs text-gray-500">See your profile</p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
              <div className="bg-gray-200 rounded-full p-2">
                <IoSettings className="text-xl text-gray-700" />
              </div>
              <span>Settings & privacy</span>
            </div>

            <div className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
              <div className="bg-gray-200 rounded-full p-2">
                <FaUser className="text-xl text-gray-700" />
              </div>
              <span>Help & support</span>
            </div>

            <div
              className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
              onClick={handleLogout}
            >
              <div className="bg-gray-200 rounded-full p-2">
                <BsDoorOpen className="text-xl text-gray-700" />
              </div>
              <span>Log out</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Menu Grid - Desktop */}
      {menubar && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 right-4 z-40 w-[360px] bg-white rounded-lg shadow-lg"
        >
          <div className="p-3 border-b">
            <h3 className="font-semibold text-xl">Menu</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 p-3">
            {[
              {
                icon: <MdGroups className="text-2xl text-blue-500" />,
                name: "Groups",
              },
              {
                icon: (
                  <Image
                    src={messenger}
                    alt="Messenger"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ),
                name: "Messages",
              },
              {
                icon: <Image src={reels} alt="Reels" width={24} height={24} />,
                name: "Reels",
              },
              {
                icon: <Image src={event} alt="Events" width={24} height={24} />,
                name: "Events",
              },
              {
                icon: <MdOutlineLiveTv className="text-2xl text-blue-500" />,
                name: "Video",
              },
              {
                icon: <CiShop className="text-2xl text-blue-500" />,
                name: "Marketplace",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ backgroundColor: "#f3f4f6" }}
                className="p-3 rounded-md flex items-center gap-3 cursor-pointer"
              >
                <div className="bg-gray-100 rounded-full p-2 flex items-center justify-center w-10 h-10">
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </motion.div>
            ))}
          </div>

          <div
            className="p-3 bg-gray-100 rounded-md mx-3 mb-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200"
            onClick={() => {
              setMenuBar(false);
              setMakePost(true);
            }}
          >
            <BsPostcardFill className="text-blue-600" />
            <span>Create a post</span>
          </div>
        </motion.div>
      )}

      {/* Create Post Modal */}
      {makePost && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setMakePost(false);
          }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-center flex-1">
                Create post
              </h2>
              <div
                className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300"
                onClick={() => setMakePost(false)}
              >
                <BiArrowBack className="text-lg" />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={userImage}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">John Doe</p>
                  <div className="bg-gray-200 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <FaUser className="text-xs" />
                    <span>Public</span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(handlePostAdd)}
                className="space-y-4"
              >
                <textarea
                  {...register("comment", { required: true })}
                  placeholder="What's on your mind, John?"
                  className="w-full rounded-lg p-3 text-lg min-h-[120px] outline-none resize-none placeholder:text-gray-500"
                />

                {selectedImage && (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-gray-800/60 text-white rounded-full p-1"
                      onClick={() => setSelectedImage(null)}
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <span className="font-medium">Add to your post</span>
                  <div className="flex items-center gap-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <FaImages className="text-xl text-green-500 hover:opacity-80" />
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setSelectedImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
                  disabled={!watch("comment") && !selectedImage}
                >
                  Post
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
