import Comment from "../../components/comment/Comment";

interface PageParams {
  id: string;
}

export default function Page({ params }: { params: PageParams }) {
  return <Comment id={params.id} />;
}
