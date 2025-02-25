export const runtime = "edge";

import { Users } from "@/features/users/components";
import { fetchUserById } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await fetchUserById(BigInt(id), await headers());
  return <Users user={user} />;
}
