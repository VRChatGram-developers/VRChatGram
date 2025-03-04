import { UserCreate } from "@/features/users/components/user-create";
import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <UserCreate />;
}
