import Test from "../../src/features/sample/components/Test";

export default async function Page() {
  // API を叩いてデータを取得
  const res = await fetch("https://alexwohlbruck.github.io/cat-facts", {
    cache: "no-store", // 最新データを取得
  });

  const data = await res;
  console.log(data);
  return (
    <>
      <div>
        <Test />
      </div>
    </>
  );
}
