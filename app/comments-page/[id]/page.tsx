"use client";
import React from "react";
import Comment from "../../components/comment/Comment";
type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const { id } = params;
  return <Comment id={id} />;
}
