import { ResetPassword } from "@/features/auth/components/reset-password";
import { redirect } from "next/navigation";
import { auth } from "@/libs/firebase/auth";
import { fetchTopThreePostImages } from "@/features/auth/endpoint";

export default async function Page() {
  const topThreePostImages = await fetchTopThreePostImages();
  if (typeof topThreePostImages === "string") {
    return <div>{topThreePostImages}</div>;
  }

  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <ResetPassword topThreePostImages={topThreePostImages} />;
}

