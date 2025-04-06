export const getStartOfWeek = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // 日曜日の日付
  startOfWeek.setHours(0, 0, 0, 0);  // 時刻を0時に設定
  return startOfWeek;
};

export const createYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1900 + 1 }, (_, index) => currentYear - index);
};

export const createMonths = () => {
  return Array.from({ length: 12 }, (_, index) => index + 1);
};

export const createDays = (year: number, month: number) => {
  let daysInMonth;
    
  if (month === 2) {
    // うるう年判定（4で割り切れる && 100で割り切れない or 400で割り切れる）
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    daysInMonth = isLeapYear ? 29 : 28;
  } else if ([4, 6, 9, 11].includes(month)) {
    daysInMonth = 30;
  } else {
    daysInMonth = 31;
  }

  return Array.from({ length: daysInMonth }, (_, index) => index + 1);
};
