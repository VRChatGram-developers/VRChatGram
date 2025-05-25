import { UserCreate } from "@/features/users/components/user-create";
import { redirect } from "next/navigation";
import { auth } from "@/libs/firebase/auth";
import { fetchTopThreePostImages } from "@/features/auth/endpoint";

export default async function Page() {
  const session = await auth();
  const topThreePostImages = await fetchTopThreePostImages();
  if (typeof topThreePostImages === "string") {
    return <div>{topThreePostImages}</div>;
  }
  if (session) {
    redirect("/");
  }
  return <UserCreate topThreePostImages={topThreePostImages} />;
}
