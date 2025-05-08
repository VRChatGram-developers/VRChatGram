import { UserProfile } from "@/features/users/components/profile/user-profile";
import { fetchUserById } from "@/features/users/endpoint";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default async function Page({ params }: { params: Promise<{ myId: string }> }) {
  const { myId } = await params;
  const user = await fetchUserById(myId, new Headers(await headers()));
  if (typeof user === "string") {
    return <div>{user}</div>;
  }
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      }
    >
      <UserProfile user={user} />
    </Suspense>
  );
}
