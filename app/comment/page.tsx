"use client";
import { useCommentStore } from "@/app/zustand";
import { usePostStore } from "../zustand1";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import Image from "next/image";
import React, { useRef, useState } from "react";
import userImage from "../../public/user.png";

type FormData = {
  comment: string;
};

export type CommentProps = {
  id: string;
};

export default function Comment({ id }: CommentProps) {
  const addComment = useCommentStore((state) => state.addComment);
  const comments = useCommentStore((state) => state.comment);
  const posts = usePostStore((state) => state.posts);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
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

  const handleImageClick = () => fileInputRef.current?.click();
  const onePost = posts.filter((post) => post.id === id);

  return (
    <main className="min-h-screen bg-[#f0f2f5] pb-28">
      {/* Header */}
      <div className="w-full h-12 bg-white fixed top-0 flex items-center justify-between px-4 shadow-sm z-10">
        <span
          className="text-blue-500 font-medium cursor-pointer"
          onClick={() => router.push("/")}
        >
          Back
        </span>
        <span className="font-semibold">Your Post</span>
        <span />
      </div>

      {/* Posts */}
      <div className="pt-16 px-4 space-y-6">
        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500"
          >
            No posts yet.
          </motion.p>
        ) : (
          onePost.map((post, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
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
                  <h2 className="font-semibold text-gray-800">{post.author}</h2>
                  <p className="text-xs text-gray-500">
                    {post.date
                      ? formatDistanceToNow(new Date(post.date), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4">
                <p className="text-gray-800">{post.comment}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="mt-3 w-full rounded-lg max-h-[500px] object-cover"
                  />
                )}
              </div>

              <div className="flex justify-around border-t border-gray-200 py-2 text-gray-600 text-sm">
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                  <BiLike className="text-xl" />
                  <span>Like</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                  <FaRegComment className="text-xl" />
                  <span>{comments.length}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}

        {/* Comments */}
        {comments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-8 text-gray-500"
          >
            <FaRegComment className="text-5xl mb-2" />
            <span>No comments yet</span>
          </motion.div>
        ) : (
          comments.map((comment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={userImage}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt="User"
                />
                <span className="font-medium text-sm text-gray-800">
                  {comment.author}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{comment.comment}</p>
              {comment.image && (
                <img
                  src={comment.image}
                  alt="Comment image"
                  className="mt-3 w-full rounded-lg max-h-60 object-cover"
                />
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Image Preview */}
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

      {/* Comment Input Bar */}
      <form
        onSubmit={handleSubmit(handleCommentAdd)}
        className="fixed bottom-0 w-full flex items-center bg-white border-t px-4 py-2 gap-3"
      >
        <span
          onClick={handleImageClick}
          className="cursor-pointer text-xl text-gray-600 hover:text-blue-500"
        >
          🖼️
        </span>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () =>
                setSelectedImage(reader.result as string);
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
        <button
          type="submit"
          className="disabled:opacity-50"
          disabled={errors.comment ? true : false}
        >
          <IoIosSend className="text-2xl text-blue-500" />
        </button>
      </form>
    </main>
  );
}
