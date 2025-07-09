import GoogleAd from "@/features/home/components/google-adsense";

export default async function Page() {
  return <GoogleAd slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_DATA_SLOT_ID || ""} />;
}
