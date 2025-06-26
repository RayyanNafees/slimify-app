import { createCookie } from "react-router";
import jwt from "jsonwebtoken";
// import jwtDecode from "jwt-decode"
// import process from "node:process";
import type { weightRec } from "./routes/weightDashboard";

export const cookieStore = createCookie("cookie-store", {
  maxAge: 604_800, // one week
});

export const createToken = (data: any, options = {}) =>
  jwt.sign(data, 'affan-ahmad', {
    expiresIn: "7d",
    ...options,
  });

export const getTokenFromCookie = async (request: Request) => {
  const cookieHeader = await request.headers.get("cookie");
  if (!cookieHeader) {
    console.log("getTokenFromCookie: No Cookie header found. Returning null");
    return null;
  }
  const { token } = await cookieStore.parse(cookieHeader);
  return token;
};

export const getUserFromToken = async (token: string) => {
  const id: any = await jwt.verify(token, 'affan-ahmad');
  console.log("idd", id);
  return id.id;
  // const decoded = jwtDecode<JwtPayload>(token); 
  // console.log("decoded", decoded)
};

