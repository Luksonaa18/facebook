// zustand.ts
import { create } from "zustand";

type CommentProps = {
  author: string;
  comment: string;
  image: string | null;
};

type CommentStore = {
  comment: CommentProps[];
  addComment: (comment: CommentProps) => void;
};

export const useCommentStore = create<CommentStore>((set, get) => {
  const storedComments = localStorage.getItem("comments");
  const initialComments: CommentProps[] = storedComments
    ? JSON.parse(storedComments)
    : [];

  return {
    comment: initialComments,
    addComment: (com: CommentProps) => {
      const updatedComments = [...get().comment, com];
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      set({ comment: updatedComments });
    },
  };
});
