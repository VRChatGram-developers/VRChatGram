import { Users } from "@/features/users/components";
import { fetchUserById } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await fetchUserById(id, new Headers(await headers()));
  if (typeof user === "string") {
    return <div>{user}</div>;
  }
  return <Users user={user} />;
}
