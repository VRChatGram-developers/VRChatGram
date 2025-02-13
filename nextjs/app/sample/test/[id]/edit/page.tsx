import {TestEditForm  } from "@/features/sample/components/TestEditForm";
import { findTest } from "@/features/sample/endpoint";

export default async function Page({ params }: { params: { id: string } }) {
  const test = await findTest(params.id);
  return <TestEditForm test={test} />;
}