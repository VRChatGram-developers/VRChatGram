import { Introduction } from "@/features/introduction/components/introduction";
import { createClient } from "microcms-js-sdk";
import { Introduction as IntroductionType } from "@/features/introduction/type/index";
export default async function Page() {
  const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
    apiKey: process.env.X_MICROCMS_API_KEY ?? "",
  });

  const usageContent = await client.get({
    endpoint: "contents",
    // queries: { filters: "type[in]usage" },
  });
  const introduction = usageContent.contents.find((content: IntroductionType) =>
    content.type.includes("introduction")
  );

  return <Introduction introduction={introduction} />;
}
