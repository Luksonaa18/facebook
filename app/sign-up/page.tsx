"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/fire";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { motion } from "framer-motion";

type SignUpData = {
  email: string;
  password: string;
};
const SignUpForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpData>();

  const router = useRouter();

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      reset();
      router.push("/sign-in");
    } catch (err: any) {
      console.log(err.message || "Failed to sign up.");
    }
  };

  return (
    <>
      {loading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
              transition: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              },
            }}
          >
            <FaFacebook className="text-blue-600 text-6xl" />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="flex flex-col items-center bg-white p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mt-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm text-gray-700">English (UK)</span>
        </motion.div>

        <motion.div
          className="flex justify-center w-full mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.4 }}
        >
          <FaFacebook className="text-blue-600 text-6xl" />
        </motion.div>

        <motion.div
          className="w-full max-w-md px-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div>
              {errors.email ? (
                <input
                  style={{ border: "1px solid red", color: "red" }}
                  type="email"
                  placeholder="Mobile number or email address"
                  {...register("email", { required: "Email is required" })}
                  className="p-3 border border-gray-300 rounded-lg w-full text-base"
                />
              ) : (
                <input
                  type="email"
                  placeholder="Mobile number or email address"
                  {...register("email", { required: "Email is required" })}
                  className="p-3 border border-gray-300 rounded-lg w-full text-base"
                />
              )}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              {errors.password ? (
                <input
                  type="password"
                  style={{ border: "1px solid red", color: "red" }}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="p-3 border border-gray-300 rounded-lg w-full text-base"
                />
              ) : (
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="p-3 border border-gray-300 rounded-lg w-full text-base"
                />
              )}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white font-medium text-base py-3 rounded-lg w-full mt-1 cursor-pointer"
            >
              Sign Up
            </motion.button>

            <div className="text-center mt-4">
              <span
                onClick={() => router.push("/sign-in")}
                className="text-blue-600 font-medium text-sm cursor-pointer"
              >
                Already have an account?
              </span>
            </div>

            <div className="border-t border-gray-300 w-full my-5"></div>

            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            ></motion.div>
          </form>
        </motion.div>

        <motion.div
          className="mt-16 items-center gap-0.5 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <FaMeta className="h-6 w-6 text-blue-400" />
          <span>Meta</span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SignUpForm;
