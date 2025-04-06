import { Users } from "@/features/users/components";
import { fetchByAccountSettings } from "@/features/users/endpoint";
import { AccountEdit } from "@/features/users/components/account-edit";
import { headers } from "next/headers";
export default async function Page() {
  const user = await fetchByAccountSettings(await headers());
  console.log(user);
  return (
    <>
      <AccountEdit accountSetting={user} />
    </>
  );
}
