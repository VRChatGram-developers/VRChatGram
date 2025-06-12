import { fetchUserById, fetchUserPosts } from "@/features/users/endpoint";
import { headers } from "next/headers";
import { ClipLoader } from "react-spinners";
import dynamic from "next/dynamic";

export default async function Page({ params }: { params: Promise<{ myId: string }> }) {
  const { myId } = await params;
  const [user, userPosts] = await Promise.all([
    fetchUserById(myId, new Headers(await headers())),
    fetchUserPosts(myId, new Headers(await headers())),
  ]);

  const UserProfile = dynamic(
    () => import("@/features/users/components/profile/user-profile").then((mod) => mod.UserProfile),
    {
      loading: () => (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      ),
    }
  );

  if (typeof userPosts === "string") {
    return <div>{userPosts}</div>;
  }
  if (typeof user === "string") {
    return <div>{user}</div>;
  }
  return <UserProfile user={user} userPosts={userPosts} />;
}
