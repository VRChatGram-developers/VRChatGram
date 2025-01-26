type BreadDetailProps = {
    params: {
      breed: string; // URL の breed パラメータを受け取る
    };
  };

export default async function Page({ params }: BreadDetailProps) {
   const { breed } = params;

  return (
    <>
      <div>
        <h1>bread detail</h1>
        <p>{breed}</p>
      </div>
    </>
  );
}
