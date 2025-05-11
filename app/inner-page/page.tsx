"use client"
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaImages } from "react-icons/fa";
import userImage from "../../public/user.png";
import { BiLike } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRegComment } from "react-icons/fa";
import "swiper/css";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";

type PostProps = {
  author: string;
  comment: string;
  date: string;
  image?: string | null;
};

type FormData = {
  comment: string;
};

const PostPage = () => {
  const slideStyle = {
    width: "170px",
    height: "290px",
    background: "gray",
    borderRadius: "20px",
    padding: "1rem",
    marginRight: "15px",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [post, setPosts] = useState<PostProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePostAdd = (data: FormData) => {
    const newComment: PostProps = {
      author: "Luka Zhozhadze",
      date: "Just Now",
      comment: data.comment,
      image: selectedImage,
    };
    setPosts([...post, newComment]);
    setSelectedImage(null);
    reset();
  };

  return (
    <>
      <main>
        <hr />
        <form
          action=""
          className="w-full p-3"
          onSubmit={handleSubmit(handlePostAdd)}
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
              {...register("comment", { required: true })}
              type="text"
              placeholder="Write a comment..."
              className="flex-1 border-none bg-gray-300 rounded-4xl h-11 px-4 outline-none"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <label htmlFor="image-upload" className="cursor-pointer">
                <FaImages className="text-2xl text-green-500" />
                <span>Photos</span>
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

          {selectedImage && (
            <div className="mt-4 flex justify-center">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto rounded"
              />
            </div>
          )}
        </form>
        <hr />

        <Swiper
          cssMode={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard]}
          className="mySwiper"
          style={{ marginTop: "14px" }}
        >
          <SwiperSlide style={slideStyle}>Slide 1</SwiperSlide>
          <SwiperSlide style={slideStyle}>Slide 2</SwiperSlide>
          <SwiperSlide style={slideStyle}>Slide 3</SwiperSlide>
          <SwiperSlide style={slideStyle}>Slide 4</SwiperSlide>
          <SwiperSlide style={slideStyle}>Slide 5</SwiperSlide>
          <SwiperSlide style={slideStyle}>Slide 6</SwiperSlide>
          <SwiperSlide style={slideStyle}>Slide 7</SwiperSlide>
          <SwiperSlide style={slideStyle}>Slide 8</SwiperSlide>
          <SwiperSlide style={slideStyle}>Slide 9</SwiperSlide>
        </Swiper>

        <div>
          {post.map((it, ind) => (
            <div
              className="w-full flex flex-col bg-white h-auto border my-4 shadow-md rounded-md"
              key={ind}
            >
              <div className="flex flex-row items-center p-4 gap-2 border-b-1">
                <Image
                  className="rounded-full"
                  src={userImage}
                  width={40}
                  height={40}
                  alt="User"
                />
                <div className="flex flex-col items-baseline">
                  <h2>{it.author}</h2>
                  <span>{it.date}</span>
                </div>
              </div>
              <div className="flex items-baseline justify-start px-4 py-2">
                <h1>{it.comment}</h1>
              </div>
              {it.image && (
                <div className="flex justify-center items-center py-2">
                  <img
                    src={it.image}
                    alt="Post"
                    className="max-h-60 max-w-full object-contain rounded"
                  />
                </div>
              )}
              <div className="flex p-4 flex-row items-center justify-between border-t">
                <div className="flex flex-row items-center gap-2">
                  <BiLike className="text-2xl"/>
                  <span>Like</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <FaRegComment className="text-2xl"/>
                  <span>Comment</span>
                </div>
               
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default PostPage;
