import BreadList from "../../../features/sample/components/TestList";
import { fetchBreads } from "@/features/sample/endpoint";

export default async function Page() {
  const tests = await fetchBreads();

  return (
    <>
      <div>
        <BreadList tests={tests} />
      </div>
    </>
  );
}
