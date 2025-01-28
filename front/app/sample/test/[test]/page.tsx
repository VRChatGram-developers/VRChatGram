type BreadDetailProps = {
    params: {
      id: number; // URL の breed パラメータを受け取る
    };
  };

export default async function Page({ params }: BreadDetailProps) {
   const { id } = params;

  return (
    <>
      <div>
        <h1>bread detail</h1>
        <p>{id}</p>
      </div>
    </>
  );
}
