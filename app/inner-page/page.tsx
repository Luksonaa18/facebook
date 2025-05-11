"use client";
import Image from "next/image";
import React from "react";

import { FaImages } from "react-icons/fa";
import userImage from "../../public/user.png";
import { BiLike } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRegComment } from "react-icons/fa";
import "swiper/css";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns"; // Import the correct function
import { usePostStore } from "../zustand1"; // Import Zustand store
import user from "../../public/user.jpeg";
import ppr from "../../public/ppr.jpeg";
import drake from "../../public/images.jpeg";
import girl from "../../public/images (1).jpeg";
const PostPage = () => {
  const slideStyle = {
    width: "170px",
    height: "290px",
    background: "gray",
    borderRadius: "20px",
    padding: "1rem",
    marginRight: "15px",
  };
  const posts = usePostStore((state) => state.posts);
  return (
    <>
      <main>
        <hr />
        <motion.form
          className="w-full p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-row items-center justify-evenly gap-4">
            <div className="w-[40px] h-[40px] rounded-full bg-gray-400">
              <Image
                className="rounded-full"
                src={userImage}
                alt="User profile image"
              />
            </div>
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 border-none bg-gray-300 rounded-4xl h-11 px-4 outline-none"
              onClick={() => redirect("/composer")}
            />
            <div
              className="flex flex-col items-center justify-center text-center"
              onClick={() => redirect("/composer")}
            >
              <label htmlFor="image-upload" className="cursor-pointer">
                <FaImages className="text-2xl text-green-500" />
                <span>Photos</span>
              </label>
              <input style={{ display: "none" }} />
            </div>
          </div>
        </motion.form>
        <hr />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Swiper
            cssMode={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Mousewheel, Keyboard]}
            className="mySwiper"
            style={{ marginTop: "14px" }}
          >
            <SwiperSlide style={slideStyle}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image className="rounded-2xl" src={user} alt="user" fill />
                <span className="text-white font-bold absolute bottom-1.5">
                  Nika <br /> НИКА
                </span>
              </motion.div>
            </SwiperSlide>
            <SwiperSlide style={slideStyle}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src={ppr} alt="ppr" fill className="rounded-2xl" />
                <span className="text-white font-bold absolute bottom-1.5">
                  {" "}
                  ლია
                  <br /> ჩხოროწყუ
                </span>
              </motion.div>
            </SwiperSlide>
            <SwiperSlide style={slideStyle}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image className="rounded-2xl" src={drake} alt="drake" fill />
                <span className="text-white font-bold absolute bottom-1.5">
                  Badri <br /> Asambadze
                </span>
              </motion.div>
            </SwiperSlide>
            <SwiperSlide style={slideStyle}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src={girl} className="rounded-2xl" alt="girl" fill />
                <span className="text-white font-bold absolute bottom-1.5">
                  Anuki <br /> Qobuleti
                </span>
              </motion.div>
            </SwiperSlide>
          </Swiper>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="container mx-auto p-4"
        >
          <h1 className="text-2xl font-bold">All Posts</h1>

          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 mt-4 shadow-lg rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={userImage}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold">{post.author}</h2>
                    <span className="text-gray-500 text-sm">
                      {/* Format the date to show relative time like "1 hour ago", "2 days ago", etc. */}
                      {post.date
                        ? formatDistanceToNow(new Date(post.date), {
                            addSuffix: true,
                          })
                        : "No date available"}
                    </span>
                  </div>
                </div>
                <p className="mt-2">{post.comment}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post image"
                    className="mt-2 rounded"
                  />
                )}
                <div className="flex flex-row w-full justify-between mt-2">
                  <div className="flex flex-row items-center gap-2 p-2">
                    <BiLike className="text-xl" />
                    <span>Like</span>
                  </div>
                  <div className="flex flex-row items-center gap-2 p-2">
                    <FaRegComment className="text-xl" />
                    <span>Comment</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </main>
    </>
  );
};

export default PostPage;
