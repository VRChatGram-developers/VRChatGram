export const bigIntToStringMap = (data: any): any => {
  if (typeof data === "bigint") {
    return data.toString(); // BigInt を string に変換
  }
  if (Array.isArray(data)) {
    return data.map(bigIntToStringMap); // 配列の要素を再帰的に処理
  }
  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, bigIntToStringMap(value)])
    ); // オブジェクトの各プロパティを再帰的に処理
  }
  return data; // それ以外はそのまま返す
};
