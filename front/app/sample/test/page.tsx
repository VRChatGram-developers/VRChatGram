import BreadList from "../../../features/sample/components/TestList";
import { fetchTests } from "@/features/sample/endpoint";

export default async function Page() {
  const tests = await fetchTests();

  return (
    <>
      <div>
        <BreadList tests={tests} />
      </div>
    </>
  );
}
