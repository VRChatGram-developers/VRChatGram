export const getStartOfWeek = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // 日曜日の日付
  startOfWeek.setHours(0, 0, 0, 0);  // 時刻を0時に設定
  return startOfWeek;
};