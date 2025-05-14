"use client";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import PostPage from "./components/inner-page/page";
import { auth } from "../app/firebase/fire";
import Header from "./components/header/page";
export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (!user && !loading) {
    return router.push("/sign-in");
  }

  console.log(user);

  return (
    <>
      <Header />
      <PostPage />
    </>
  );
}
