import { SignInForm } from "@/features/auth/components/sign-in-form";
import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <SignInForm />;
}

