export interface WeightRecord {
  date: string;
  time: string;
  weight: number;
  dayOfWeek: string;
}

export const weightData: WeightRecord[] = [
  { date: "9-june", time: "8:56 AM", weight: 75.40, dayOfWeek: "Sun" },
  { date: "10-june", time: "9:18 AM", weight: 76.35, dayOfWeek: "Mon" },
  { date: "11-june", time: "9:01 AM", weight: 74.85, dayOfWeek: "Tue" },
  { date: "12-june", time: "7:43 AM", weight: 74.85, dayOfWeek: "Wed" },
  { date: "13-june", time: "9:03 AM", weight: 73.40, dayOfWeek: "Thu" },
  { date: "14-june", time: "9:18 AM", weight: 73.10, dayOfWeek: "Fri" },
  { date: "15-june", time: "9:16 AM", weight: 73.05, dayOfWeek: "Sat" },
  { date: "16-june", time: "9:19 AM", weight: 73.05, dayOfWeek: "Sun" },
  { date: "17-june", time: "9:15 AM", weight: 73.05, dayOfWeek: "Mon" },
  { date: "18-june", time: "8:57 AM", weight: 72.55, dayOfWeek: "Tue" },
];
