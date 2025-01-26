import BreadList from "../../../features/sample/components/BreadList";
import { fetchBreads } from "@/features/sample/endpoint";

export default async function Page() {
  const breads = await fetchBreads();

  return (
    <>
      <div>
        <BreadList breads={breads} />
      </div>
    </>
  );
}
