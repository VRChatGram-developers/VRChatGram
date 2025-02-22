// utils/queryParams.ts

export const createQueryParams = (params: Record<string, string | number>) => {
    const queryParams = new URLSearchParams();
  
    // params からすべてのキーと値を動的に処理
    for (const [key, value] of Object.entries(params)) {
      // 値が存在する場合のみ、クエリパラメータとして追加
      if (value !== undefined && value !== null) {
        queryParams.set(key, encodeURIComponent(String(value)));
      }
    }
  
    return queryParams.toString();
  };
  