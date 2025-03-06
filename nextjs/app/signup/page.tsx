import { UserCreate } from "@/features/users/components/user-create";
import { redirect } from "next/navigation";
import { auth } from "@/libs/firebase/auth";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <UserCreate />;
}
