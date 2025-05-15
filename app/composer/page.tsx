"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePostStore } from "../zustand1"; // ensure your postStore is named zustand1
import { useRouter } from "next/navigation";
import { FaImages } from "react-icons/fa";
import userImage from "../../public/user.png";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/fire";
import { v4 as uuidv4 } from "uuid";

type FormData = {
  comment: string;
};

const ComposerPage = () => {
  const [user, loading] = useAuthState(auth);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [closed, setClosed] = useState(false);
  const addPost = usePostStore((state) => state.addPost);
  const router = useRouter();

  const handlePostAdd = (data: FormData) => {
    const newPost = {
      author: user?.displayName || "Luka Zhozhadze",
      comment: data.comment,
      date: new Date(),
      image: selectedImage,
      video: selectedVideo,
      id: uuidv4(),
    };

    addPost(newPost);
    reset();
    setSelectedImage(null);
    setSelectedVideo(null);
    router.push("/");
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedVideo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user && !loading) {
    router.push("/sign-in");
  }

  return (
    <main className="p-4 relative overflow-hidden sm:visible  min-h-screen bg-gray-100">
      {/* Header */}
      <motion.div
        className="flex flex-row items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <IoCloseSharp
          className="text-2xl cursor-pointer"
          onClick={() => setClosed(true)}
        />
      </motion.div>

      {/* User Info */}
      <motion.div
        className="flex flex-row items-center gap-2.5 mt-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Image src={userImage} alt="user" width={50} className="rounded-full" />
        <h1 className="text-2xl">{user?.displayName || "Luka Zhozhadze"}</h1>
      </motion.div>

      {/* Create Post Title */}
      <motion.h1
        className="text-xl font-bold mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Create Post
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(handlePostAdd)}
        className="flex flex-col gap-4 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <textarea
          {...register("comment", { required: true })}
          placeholder="Write your comment..."
          className="border p-2 rounded-lg"
          rows={4}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-green-500 flex items-center gap-2"
            >
              <FaImages className="text-xl" />
              <span>Add an Image</span>
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
          <div className="flex items-center gap-2">
            <label
              htmlFor="video-upload"
              className="cursor-pointer text-red-600 flex items-center gap-2"
            >
              <FaVideo className="text-xl" />
              <span>Add a Video</span>
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideoUpload}
            />
          </div>
        </div>

        {/* Image Preview Animation */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="mt-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="rounded shadow w-full"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <IoCloseSharp className="text-lg" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Preview Animation */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              className="mt-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <video
                  src={selectedVideo}
                  controls
                  className="rounded shadow w-full"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                  onClick={() => setSelectedVideo(null)}
                >
                  <IoCloseSharp className="text-lg" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          whileTap={{ scale: 0.95 }}
        >
          Post
        </motion.button>
      </motion.form>

      {/* Blur Background + Confirmation Modal */}
      <AnimatePresence>
        {closed && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setClosed(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 w-full bg-white p-6 rounded-t-2xl z-50"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-lg font-semibold">Discard post?</h1>
                <span className="text-sm text-gray-600 text-center">
                  If you discard now, you'll lose everything you've written.
                </span>
              </div>
              <div
                onClick={() => router.push("/")}
                className="flex flex-row items-center justify-center gap-2 mt-4 cursor-pointer hover:opacity-80 transition"
              >
                <MdDelete className="text-red-600 text-3xl" />
                <span className="text-red-600 font-medium">Discard</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ComposerPage;