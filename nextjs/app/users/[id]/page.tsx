import { Users } from "@/features/users/components";
import { fetchUserById } from "@/features/users/endpoint";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await fetchUserById(BigInt(id));
  return <Users user={user} />;
}
