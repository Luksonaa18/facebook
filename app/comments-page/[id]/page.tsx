import React from "react";
import Comment from "../../components/comment/Comment";
type Props = {
  params: { id: string };
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Comment id={id} />;
}
