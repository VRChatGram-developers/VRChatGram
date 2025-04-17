import { AccountSetting } from "@/features/users/components/account-setting";
import { fetchByAccountSettings } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page() {
  const user = await fetchByAccountSettings(await headers());
  return (
    <>
      <AccountSetting accountSetting={user} />
    </>
  );
}
