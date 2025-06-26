import type { weightRec } from "./routes/weightDashboard";

export const sortData = (data: weightRec[]) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Make a shallow copy of the array to avoid modifying the original 'data' array directly
  // unless that's the intended behavior and `data.sort` is acceptable.
  // Using `[...data]` ensures you're sorting a new array.
  let info = [...data]; // Important: Work on a copy

  const getIndexOfMonth = (month: string) => months.indexOf(month);

  info.sort((a, b) => {
    // 1. Sort by year
    const yearA = parseFloat(a.year);
    const yearB = parseFloat(b.year);
    if (yearA !== yearB) {
      return yearA - yearB;
    }

    // 2. If years are the same, sort by month
    const monthA = getIndexOfMonth(a.month);
    const monthB = getIndexOfMonth(b.month);
    if (monthA !== monthB) {
      return monthA - monthB;
    }

    // 3. If years and months are the same, sort by day (dateNum)
    const dateNumA = parseFloat(a.dateNum);
    const dateNumB = parseFloat(b.dateNum);
    return dateNumA - dateNumB;
  });

  console.log("inside data", info);
  return info;
};
