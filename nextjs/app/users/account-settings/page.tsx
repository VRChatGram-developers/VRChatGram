import { AccountEdit } from "@/features/users/components/account-edit";
import { fetchByAccountSettings } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page() {
  const user = await fetchByAccountSettings(await headers());
  return (
    <>
      <AccountEdit accountSetting={user} />
    </>
  );
}
