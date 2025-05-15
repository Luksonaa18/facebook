"use client";
import React from "react";
import Header from "../components/header/page";
import { CiSettings } from "react-icons/ci";
import { FaLessThan, FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/navigation";
import userImage from "../../public/user.png";
import Image from "next/image";
import { motion } from "framer-motion";

// Dummy friend data (replace with API data if needed)
const friends = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Johnson" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "Daniel Brown" },
];

const Friends = () => {
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Header />
      {/* Desktop View */}
      <main className="hidden lg:flex flex-row items-start gap-40 relative w-full bg-gray-100">
        {/* Sidebar */}
        <aside className="w-80 fixed h-screen left-0 bg-white shadow-md p-6">
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-bold text-3xl">Friends</h1>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 cursor-pointer hover:bg-gray-300 transition">
              <CiSettings className="text-2xl" />
            </div>
          </div>
          <div className="mt-8">
            <div className="flex flex-row items-center gap-4 text-lg font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 p-3 rounded-lg">
              <FaUserFriends className="text-xl" />
              <span>Home</span>
            </div>
          </div>
        </aside>

        {/* Friend Requests */}
        <div className="ml-96 flex flex-wrap gap-6 p-6">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="w-72 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={userImage}
                alt="user"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h1 className="font-bold text-lg">{friend.name}</h1>
                <div className="flex flex-row items-center gap-3 mt-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 font-bold w-full"
                  >
                    Confirm
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-200 text-black rounded-lg px-4 py-2 font-bold w-full"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Mobile View */}
      <main className="lg:hidden">
        <div className="flex flex-col p-4">
          <div className="flex flex-row items-center gap-4 mb-6">
            <FaLessThan
              onClick={() => router.back()}
              className="cursor-pointer text-xl"
            />
            <span className="text-2xl font-bold">Friends</span>
          </div>
          <div className="flex flex-col gap-6">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center bg-white rounded-lg shadow-md p-4"
              >
                <Image
                  src={userImage}
                  alt="user"
                  width={65}
                  height={65}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col ml-4 flex-grow">
                  <h1 className="font-bold">{friend.name}</h1>
                  <div className="flex flex-row items-center gap-2 mt-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-500 text-white rounded-lg px-4 py-2 font-bold"
                    >
                      Confirm
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-200 text-black rounded-lg px-4 py-2 font-bold"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Friends;
