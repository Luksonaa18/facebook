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

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  addPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
}));
