"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { usePostStore } from "../../zustand1";
import { formatDistanceToNow } from "date-fns";
import { BiLike } from "react-icons/bi";
import { FaRegComment, FaImages } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

// Images
import userImage from "../../../public/user.png";
import user from "../../../public/user.jpeg";
import ppr from "../../../public/ppr.jpeg";
import drake from "../../../public/images.jpeg";
import girl from "../../../public/images (1).jpeg";

const PostPage = () => {
  const router = useRouter();
  const posts = usePostStore((state) => state.posts);

  const stories = [
    { img: user, name: "Nika", subtitle: "НИКА" },
    { img: ppr, name: "ლია", subtitle: "ჩხოროწყუ" },
    { img: drake, name: "Badri", subtitle: "Asambadze" },
    { img: girl, name: "Anuki", subtitle: "Qobuleti" },
  ];

  const slideStyle: React.CSSProperties = {
    width: "170px",
    height: "290px",
    borderRadius: "20px",
    padding: "1rem",
    marginRight: "15px",
    position: "relative",
    overflow: "hidden",
  };

  const renderPosts = () =>
    posts.length === 0 ? (
      <p className="text-gray-500 text-sm">No posts yet.</p>
    ) : (
      posts.map((post, index) => (
        <motion.div
          key={index}
          className="bg-white p-4 rounded-lg shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center space-x-3">
            <Image
              src={userImage}
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h2 className="font-medium text-gray-800">{post.author}</h2>
              <p className="text-xs text-gray-500">
                {post.date
                  ? formatDistanceToNow(new Date(post.date), {
                      addSuffix: true,
                    })
                  : "Just now"}
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-700">{post.comment}</p>

          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="mt-2 w-full rounded-lg max-h-[400px] object-cover"
            />
          )}

          <div className="flex justify-between mt-4 text-gray-600 text-sm border-t pt-2">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <BiLike className="text-lg" />
              <span>Like</span>
            </div>
            <div
              onClick={() => router.push("/comments-page")}
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
            >
              <FaRegComment className="text-lg" />
              <span>Comment</span>
            </div>
          </div>
        </motion.div>
      ))
    );

  const renderStories = () => (
    <Swiper
      cssMode={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Mousewheel, Keyboard]}
      className="mySwiper"
      style={{ padding: "1rem" }}
    >
      {stories.map((story, idx) => (
        <SwiperSlide key={idx} style={slideStyle}>
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={story.img}
              alt={story.name}
              fill
              className="object-cover filter brightness-75"
            />
            <span className="absolute bottom-2 left-2 text-white font-semibold text-sm">
              {story.name}
              <br />
              {story.subtitle}
            </span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <main className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      {/* Container that becomes flex only on desktop */}
      <div className="w-full max-w-7xl mx-auto lg:flex lg:space-x-6">
        {/* Left Sidebar (Desktop only, sticky) */}
        <aside className="hidden lg:block w-64 sticky top-20">
          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">Friends</li>
              <li className="hover:text-blue-600 cursor-pointer">Groups</li>
              <li className="hover:text-blue-600 cursor-pointer">Saved</li>
            </ul>
          </div>
        </aside>

        {/* Main Feed */}
        <section className="flex-1 space-y-6">
          {/* Post Composer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-4 sm:p-5 rounded-lg shadow"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Image
                src={userImage}
                alt="User profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <input
                type="text"
                placeholder="What's on your mind?"
                onClick={() => router.push("/composer")}
                className="flex-1 bg-gray-100 rounded-full px-4 sm:px-5 py-2 sm:py-3 outline-none text-sm sm:text-base"
              />
            </div>
            <div className="mt-4 border-t pt-2 flex justify-around text-sm text-gray-500">
              <div
                onClick={() => router.push("/composer")}
                className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <FaImages className="text-green-500 text-lg sm:text-xl" />
                <span>Photo/Video</span>
              </div>
            </div>
          </motion.div>

          {/* Stories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {renderStories()}
          </motion.div>

          {/* Posts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              All Posts
            </h1>
            {renderPosts()}
          </motion.div>
        </section>

        <aside className="hidden lg:block w-64 sticky top-20">
          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Right Sidebar
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">Trending</li>
              <li className="hover:text-blue-600 cursor-pointer">Events</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default PostPage;
