export type Test = {
    id: number;
    name: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export type Tests = {
    tests: Test[];  // テストのリスト
}
