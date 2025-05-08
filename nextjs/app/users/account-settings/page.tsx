import { AccountSetting } from "@/features/users/components/account-setting";
import { fetchByAccountSettings } from "@/features/users/endpoint";
import { headers } from "next/headers";
import { ClipLoader } from "react-spinners";
import { Suspense } from "react";

export default async function Page() {
  const user = await fetchByAccountSettings(await headers());
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      }
    >
      <AccountSetting accountSetting={user} />
    </Suspense>
  );
}
