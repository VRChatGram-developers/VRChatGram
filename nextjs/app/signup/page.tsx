import { UserCreate } from "@/features/users/components/user-create";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/firebase/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  
  if (session) {
    redirect("/");
  }
  return <UserCreate />;
}
