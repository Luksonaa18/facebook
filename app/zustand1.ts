import { create } from "zustand";

type Post = {
  author: string;
  comment: string;
  date: Date;
  image: string | null;
};

type PostStore = {
  posts: Post[];
  addPost: (post: Post) => void;
};
const parsePosts = (posts: any[]): Post[] =>
  posts.map((post) => ({
    ...post,
    date: new Date(post.date),
  }));

export const usePostStore = create<PostStore>((set, get) => {
  const storedPosts = localStorage.getItem("posts");
  const initialPosts: Post[] = storedPosts
    ? parsePosts(JSON.parse(storedPosts))
    : [];

  return {
    posts: initialPosts,
    addPost: (post: Post) => {
      const updatedPosts = [...get().posts, post];
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      set({ posts: updatedPosts });
    },
  };
});
