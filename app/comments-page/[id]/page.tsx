import Comment from "../../components/comment/Comment";

export default async function Page({ 
  params 
}: { 
  params: { id: string; } 
}) {
  // Making the function async to match the expected Promise interface
  return <Comment id={params.id} />;
}