"use client";

import { useCommentStore } from "@/app/zustand";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { usePostStore } from "../zustand1";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import userImage from "../../public/user.png";
import Image from "next/image";

type FormData = {
  comment: string;
};

const Comment = () => {
  const addComment = useCommentStore((state) => state.addComment);
  const comments = useCommentStore((state) => state.comment);
  const posts = usePostStore((state) => state.posts);
  const router = useRouter();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCommentAdd = (data: FormData) => {
    const newComment = {
      author: "Luka Zhozhadze",
      comment: data.comment,
      image: selectedImage,
    };
    addComment(newComment);
    reset();
    setSelectedImage(null);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-28">
      <div className="w-full h-11 bg-white fixed top-0 flex flex-row items-center justify-between p-3 z-10">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          Back
        </span>
        <span className="font-bold">Your Post</span>
      </div>

      <div className="pt-14 px-4 space-y-6">
        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600"
          >
            No posts yet.
          </motion.p>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 p-4">
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
                    {post.date
                      ? formatDistanceToNow(new Date(post.date), {
                          addSuffix: true,
                        })
                      : "No date"}
                  </span>
                </div>
              </div>

              <div className="p-4 border-t">
                <p className="mb-2">{post.comment}</p>
                {post.image && (
                  <motion.img
                    src={post.image}
                    alt="Post image"
                    className="w-full h-auto rounded-lg"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              <div className="flex justify-between border-t px-4 py-2">
                <motion.div
                  className="flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <BiLike className="text-xl" />
                  <span>Like</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaRegComment className="text-xl" />
                  <span>{comments.length}</span>
                </motion.div>
              </div>
            </motion.div>
          ))
        )}

        {comments.length === 0 ? (
          <motion.div
            className="w-full flex flex-col items-center justify-center py-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaRegComment className="text-5xl mb-2" />
            <span>No comments yet</span>
          </motion.div>
        ) : (
          comments.map((it, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.0005 }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={userImage}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt="User"
                />
                <span className="text-sm text-gray-700 font-medium">
                  {it.author}
                </span>
              </div>
              <p className="text-gray-800 mt-2">{it.comment}</p>
              {it.image && (
                <img
                  src={it.image}
                  alt="Comment image"
                  className="mt-2 w-full max-h-60 object-cover rounded"
                />
              )}
            </motion.div>
          ))
        )}
      </div>

      {selectedImage && (
        <div className="fixed bottom-20 left-4 right-4 bg-white p-2 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">Image preview:</p>
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full max-h-40 object-cover rounded"
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleCommentAdd)}
        className="w-full fixed bottom-0 flex items-center gap-4 bg-white p-2 border-t"
      >
        <span onClick={handleImageClick} className="cursor-pointer text-xl">
          🖼️
        </span>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          ref={fileInputRef}
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
        <input
          type="text"
          placeholder="Write a comment..."
          {...register("comment", { required: true })}
          className="flex-1 px-4 py-2 rounded-full bg-gray-200 outline-none"
        />
        <button type="submit">
          <IoIosSend className="text-2xl text-blue-500 animate-pulse" />
        </button>
      </form>
    </main>
  );
};

export default Comment;
