import { UserProfile } from "@/features/users/components/profile/user-profile";
import { fetchUserById } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page({ params }: { params: Promise<{ myId: string }> }) {
  const { myId } = await params;
  const user = await fetchUserById(myId, new Headers(await headers()));
  if (typeof user === "string") {
    return <div>{user}</div>;
  }
  return <UserProfile user={user} />;
}
