// zustand.ts
import { create } from "zustand";
import { StorageValue } from "zustand/middleware";
import { persist } from "zustand/middleware";

type CommentProps = {
  author: string;
  comment: string;
  image: string | null;
};

type CommentStore = {
  comment: CommentProps[];
  addComment: (comment: CommentProps) => void;
};

export const useCommentStore = create<CommentStore>()(
  persist(
    (set, get) => ({
      comment: [],
      addComment: (com: CommentProps) => {
        set({ comment: [...get().comment, com] });
      },
    }),
    {
      name: "comments", // name used in storage
      storage: {
        getItem: (name: string): StorageValue<CommentStore> | null => {
          if (typeof window === "undefined") return null;
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) as StorageValue<CommentStore> : null;
        },
        setItem: (name: string, value: StorageValue<CommentStore>): void => {
          if (typeof window === "undefined") return;
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string): void => {
          if (typeof window === "undefined") return;
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
