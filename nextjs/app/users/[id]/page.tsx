import { Users } from "@/features/users/components";
import { fetchUserById } from "@/features/users/endpoint";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const propParams = await params;
  const id = propParams.id;
  const user = await fetchUserById(BigInt(id), await headers());
  return <Users user={user} />;
}
