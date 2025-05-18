import Comment from "../../components/comment/Comment";

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return <Comment id={params.id} />;
}
