// postStore.ts
import { create } from "zustand";
import { StorageValue } from "zustand/middleware";
import { persist } from "zustand/middleware";

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

// Helper to parse the date after loading from storage
const parsePosts = (posts: any[]): Post[] =>
  posts.map((post) => ({
    ...post,
    date: new Date(post.date),
  }));

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      addPost: (post: Post) => {
        set({ posts: [...get().posts, post] });
      },
    }),
    {
      name: "posts",
      storage: {
        getItem: (name: string): StorageValue<PostStore> | null => {
          if (typeof window === "undefined") return null;
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: unknown): void => {
          if (typeof window === "undefined") return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string): void => {
          if (typeof window === "undefined") return;
          localStorage.removeItem(name);
        },
      },
      // Parse date on rehydrate
      onRehydrateStorage: () => (state) => {
        if (state?.posts) {
          state.posts = parsePosts(state.posts);
        }
      },
    }
  )
);
