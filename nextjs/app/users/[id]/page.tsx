import { Users } from "@/features/users/components";
import { fetchUserById } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await fetchUserById(id, await headers());
  return <Users user={user} />;
}
