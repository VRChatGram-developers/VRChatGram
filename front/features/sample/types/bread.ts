export type Bread = {
    breed: string;
    country: string;
    origin: string;
    coat: string;
    pattern: string;
}

export type Breads = {
    current_page: number; // 現在のページ番号
    data: Bread[]; // パンのリスト
}
