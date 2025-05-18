import { UsageDetail } from "@/features/usage/components/usage-detail";
import { createClient } from "microcms-js-sdk";
import { Usage } from "@/features/usage/type/index";
export default async function Page() {
  const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
    apiKey: process.env.X_MICROCMS_API_KEY ?? "",
  });

  const usageContent = await client.get({
    endpoint: "contents",
  });
  const usage = usageContent.contents.find((content: Usage) => content.type.includes("usage"));

  return <UsageDetail usage={usage} />;
}
