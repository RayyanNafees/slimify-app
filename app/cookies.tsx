import { createCookie } from "react-router";
import jwt from "jsonwebtoken";
import process from "node:process";
import type { weightRec } from "./routes/weightDashboard";

export const cookieStore = createCookie("cookie-store", {
  maxAge: 604_800, // one week
});

export const createToken = (data: {}, options = {}) =>
  jwt.sign(data, process.env.JWT_SECRECT_KEY as string, {
    expiresIn: "7d",
    ...options,
  });

export const getTokenFromCookie = async (request: Request) => {
  const cookieHeader = await request.headers.get("cookie");
  // if (!cookieHeader) {
  //   console.log("getTokenFromCookie: No Cookie header found. Returning null")
  //   return null
  // }
  const { token } = await cookieStore.parse(cookieHeader);
  return token;
};

export const getUserFromToken = async (token: string) => {
  const id = await jwt.verify(token, process.env.JWT_SECRECT_KEY as string);
  console.log("idd", id);
  return id.id;
};

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
