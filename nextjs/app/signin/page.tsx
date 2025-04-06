import { SignInForm } from "@/features/auth/components/sign-in-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <SignInForm />;
}

