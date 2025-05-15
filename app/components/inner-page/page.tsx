"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { usePostStore } from "../../zustand1";
import { formatDistanceToNow } from "date-fns";
import { BiLike } from "react-icons/bi";
import { FaRegComment, FaImages, FaShare } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import userImage from "../../../public/user.png";
import user from "../../../public/user.jpeg";
import ppr from "../../../public/ppr.jpeg";
import drake from "../../../public/images.jpeg";
import girl from "../../../public/images (1).jpeg";
import { useCommentStore } from "@/app/zustand";

const PostPage = () => {
  const router = useRouter();
  const posts = usePostStore((state) => state.posts);
  const comments = useCommentStore((state) => state.comment);

  const stories = [
    { img: user, name: "Nika" },
    { img: ppr, name: "ლია" },
    { img: drake, name: "Badri" },
    { img: girl, name: "Anuki" },
  ];

  const renderPosts = () =>
    posts.length === 0 ? (
      <p className="text-gray-500 text-base">No posts yet.</p>
    ) : (
      posts.map((post, index) => (
        <motion.div
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm"
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
              <h2 className="font-semibold text-gray-900">{post.author}</h2>
              <p className="text-xs text-gray-500">
                {post.date
                  ? formatDistanceToNow(new Date(post.date), {
                      addSuffix: true,
                    })
                  : "Just now"}
              </p>
            </div>
          </div>
          <p className="mt-3 text-base text-gray-800">{post.comment}</p>

          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="mt-3 w-full rounded-lg max-h-[500px] object-cover"
            />
          )}

          <div className="flex justify-around mt-4 text-gray-600 text-sm border-t pt-2">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <BiLike className="text-xl" />
              <span>Like</span>
            </div>
            <div
              onClick={() => router.push(`/comments-page/${post.id}`)}
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
            >
              <FaRegComment className="text-xl" />
              <span>Comment</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
              <FaShare className="text-xl" />
              <span>Share</span>
            </div>
          </div>
        </motion.div>
      ))
    );

  const renderStories = () => (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {/* Add Story Card */}
      <div className="relative w-24 h-40 rounded-lg bg-white shadow-sm flex flex-col items-center justify-center cursor-pointer">
        <Image
          src={userImage}
          alt="Add Story"
          width={40}
          height={40}
          className="rounded-full mb-2"
        />
        <span className="text-sm font-semibold">Add Story</span>
      </div>
      {stories.map((story, idx) => (
        <div
          key={idx}
          className="relative w-24 h-40 rounded-lg overflow-hidden cursor-pointer shadow-sm"
        >
          <Image
            src={story.img}
            alt={story.name}
            fill
            className="object-cover brightness-75"
          />
          <span className="absolute bottom-2 left-2 text-white text-sm font-semibold">
            {story.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <main className="bg-[#f0f2f5] min-h-screen py-4">
      <div className="w-full max-w-6xl mx-auto lg:flex lg:space-x-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-72 sticky top-20">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 cursor-pointer">
                <Image
                  src={userImage}
                  alt="user"
                  width={40}
                  className="rounded-full"
                />
                <span className="font-medium text-gray-900">
                  Luka Zhozhadze
                </span>
              </div>
              <div className="mt-6 space-y-3 text-gray-700 text-sm">
                <p className="cursor-pointer hover:text-blue-600">Friends</p>
                <p className="cursor-pointer hover:text-blue-600">Groups</p>
                <p className="cursor-pointer hover:text-blue-600">
                  Marketplace
                </p>
                <p className="cursor-pointer hover:text-blue-600">Watch</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <section className="flex-1 space-y-6">
          {/* Composer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <Image
                src={userImage}
                alt="User profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <input
                type="text"
                placeholder="What's on your mind, Luka?"
                onClick={() => router.push("/composer")}
                className="flex-1 bg-gray-100 rounded-full px-4 py-3 outline-none text-base"
              />
            </div>
            <div className="mt-4 border-t pt-2 flex justify-around text-sm text-gray-600">
              <div
                onClick={() => router.push("/composer")}
                className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <FaImages className="text-green-500 text-lg" />
                <span>Photo/Video</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <span>Feeling/Activity</span>
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
            {renderPosts()}
          </motion.div>
        </section>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-72 sticky top-20">
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Sponsored</h2>
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
