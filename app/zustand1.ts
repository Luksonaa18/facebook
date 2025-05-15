// postStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Post = {
  author: string;
  comment: string;
  date: Date;
  image: string | null;
};

type PostStore = {
  posts: Post[];
  selectedPost: Post | null;
  addPost: (post: Post) => void;
  setSelectedPost: (post: Post) => void;
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
      selectedPost: null,
      addPost: (post: Post) => set({ posts: [...get().posts, post] }),
      setSelectedPost: (post: Post) => set({ selectedPost: post }),
    }),
    {
      name: "posts",
      storage: {
        getItem: (name: string) => {
          if (typeof window === "undefined") return null;
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: unknown) => {
          if (typeof window === "undefined") return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          if (typeof window === "undefined") return;
          localStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state) => {
        if (state?.posts) {
          state.posts = parsePosts(state.posts);
        }
      },
    }
  )
);
