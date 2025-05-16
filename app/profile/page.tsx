"use client";
import React, { useRef, useState } from "react";
import { FaLessThan, FaCamera } from "react-icons/fa";
import { usePostStore } from "../zustand1";
import Image from "next/image";
import userImage from "../../public/user.png";
import coverPlaceholder from "../../public/user.jpeg";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

const Profile = () => {
  const posts = usePostStore((state) => state.posts);
  const router = useRouter();

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
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow fixed top-0 left-0 right-0 z-10">
        <FaLessThan
          className="text-lg cursor-pointer"
          onClick={() => router.back()}
        />
        <span className="font-semibold text-lg">Luka Zhozhadze</span>
        <span />
      </div>

      {/* Profile Section */}
      <div className="pt-14 relative">
        {/* Cover photo */}
        <div className="relative w-full h-56 bg-gray-300">
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
              className="object-cover riu"
            />
          )}
          {/* Cover change button */}
          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute right-4 bottom-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <FaCamera />
          </button>
          <input
            type="file"
            ref={coverInputRef}
            accept="image/*"
            hidden
            onChange={handleCoverChange}
          />

          {/* Profile Image */}
          <div className="absolute bottom-[-50px] left-4 border-4 border-white rounded-full  w-28 h-28">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={userImage}
                alt="Profile"
                fill
                className="object-cover rounded-full"
              />
            )}
            {/* Profile change button */}
            <button
              onClick={() => profileInputRef.current?.click()}
              className="absolute bottom-2 right-0 z-200 bg-black bg-opacity-50 text-white p-1 rounded-full"
            >
              <FaCamera />
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

        {/* User Info */}
        <div className="mt-16 px-4">
          <h1 className="text-xl font-bold">Luka Zhozhadze</h1>
          <p className="text-gray-500">100 friends</p>
          <button className="mt-3 w-full bg-blue-500 text-white font-semibold rounded-md py-2">
            Edit profile
          </button>
        </div>

        {/* Nav */}
        <div className="mt-4 flex justify-around border-t border-b bg-white py-3">
          <span className="font-medium text-blue-600 border-b-2 border-blue-600 pb-2">
            Posts
          </span>
          <span className="text-gray-600">About</span>
          <span className="text-gray-600">Friends</span>
          <span className="text-gray-600">Photos</span>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-4 mt-4 space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-3">
                <Image
                  src={userImage}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h2 className="font-semibold">{post.author}</h2>
                  <p className="text-xs text-gray-500">
                    {post.date
                      ? formatDistanceToNow(new Date(post.date), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </p>
                </div>
              </div>
              <p className="mt-3">{post.comment}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-3 w-full rounded-lg max-h-[500px] object-cover"
                />
              )}
              <div className="flex justify-around border-t border-gray-200 mt-4 pt-2 text-gray-600 text-sm">
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                  <BiLike className="text-xl" />
                  <span>Like</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                  <FaRegComment className="text-xl" onClick={()=>router.push("/comment")}/>
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
