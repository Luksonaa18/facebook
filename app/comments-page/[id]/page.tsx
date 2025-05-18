import Comment from "../../components/comment/Comment";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Page({ params }: Props) {
  return <Comment id={params.id} />;
}
