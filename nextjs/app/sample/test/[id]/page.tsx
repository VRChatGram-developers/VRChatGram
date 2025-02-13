import { TestDetail } from "@/features/sample/components/TestDetail";
import { findTest } from "@/features/sample/endpoint";

type BreadDetailProps = {
  params: {
    id: string; // URL の breed パラメータを受け取る
  };
};

export const dynamicParams = true;

export default async function Page({ params }: BreadDetailProps) {
  const id = await Promise.resolve(params.id);
  const test = await findTest(id);

  return <TestDetail test={test} />;
}
