"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePostStore } from "../zustand1";
import { formatDistanceToNow } from "date-fns";
import { BiLike } from "react-icons/bi";
import { FaRegComment, FaCamera } from "react-icons/fa";
import userImage from "../../public/user.png";
import coverPlaceholder from "../../public/user.jpeg";

const Profile = () => {
  const router = useRouter();
  const posts = usePostStore((state) => state.posts);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-2 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-base md:text-lg">
          ←
        </button>
        <span className="font-semibold text-base md:text-lg">Luka Zhozhadze</span>
        <span />
      </div>

      {/* Profile Section */}
      <div className="pt-14 relative">
        {/* Cover Photo */}
        <div className="relative w-full h-56 md:h-72 bg-gray-300">
          {coverImage ? (
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={coverPlaceholder}
              alt="Cover"
              fill
              className="object-cover"
            />
          )}
          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute right-4 bottom-4 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            <FaCamera className="text-sm md:text-base" />
          </button>
          <input
            type="file"
            ref={coverInputRef}
            accept="image/*"
            hidden
            onChange={handleCoverChange}
          />

          <div className="absolute bottom-[-48px] left-4 md:left-10 border-4 border-white rounded-full w-24 h-24 md:w-32 md:h-32">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <Image
                src={userImage}
                alt="Profile"
                fill
                className="object-cover rounded-full"
              />
            )}
            <button
              onClick={() => profileInputRef.current?.click()}
              className="absolute bottom-2 right-0 bg-black bg-opacity-60 text-white p-1 rounded-full hover:bg-opacity-70"
            >
              <FaCamera className="text-xs md:text-sm" />
            </button>
            <input
              type="file"
              ref={profileInputRef}
              accept="image/*"
              hidden
              onChange={handleProfileChange}
            />
          </div>
        </div>

        <div className="mt-16 px-4 md:px-10">
          <h1 className="text-lg md:text-2xl font-bold">Luka Zhozhadze</h1>
          <p className="text-gray-500 text-sm md:text-base">100 friends</p>
          <button className="mt-3 px-4 py-1.5 md:py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm md:text-base w-full md:w-auto">
            Edit profile
          </button>
        </div>

        <div className="mt-4 flex justify-around md:justify-start md:gap-6 border-t border-b bg-white py-2 md:py-3 px-4 md:px-10 text-sm md:text-base overflow-x-auto">
          <span className="font-medium text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer">
            Posts
          </span>
          <span className="text-gray-600 cursor-pointer hover:text-black">About</span>
          <span className="text-gray-600 cursor-pointer hover:text-black">Friends</span>
          <span className="text-gray-600 cursor-pointer hover:text-black">Photos</span>
        </div>
      </div>

      <div className="px-4 md:px-10 mt-4 space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-3 md:p-4">
              <div className="flex items-center gap-3">
                <Image
                  src={userImage}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-sm md:text-base">{post.author}</h2>
                  <p className="text-xs text-gray-500">
                    {post.date
                      ? formatDistanceToNow(new Date(post.date), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm md:text-base">{post.comment}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-3 w-full rounded-lg max-h-[500px] object-cover"
                />
              )}
              <div className="flex justify-around md:justify-start md:gap-10 border-t border-gray-200 mt-4 pt-2 text-gray-600 text-sm">
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                  <BiLike className="text-base" />
                  <span>Like</span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
                  onClick={() => router.push(`/comments-page/${post.id}`)}
                >
                  <FaRegComment className="text-base" />
                  <span>Comment</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Profile;
