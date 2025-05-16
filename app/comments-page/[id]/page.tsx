import { use } from "react";
import Comment from "../../components/comment/page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  return <Comment id={id} />;
}
