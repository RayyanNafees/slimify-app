import { createCookie } from "react-router";
import jwt from "jsonwebtoken";
import process from "node:process";

export const cookieStore = createCookie("cookie-store", {
  maxAge: 604_800, // one week
});

export const createToken = (data:{}, options = {}) =>
  jwt.sign(data, process.env.JWT_SECRECT_KEY as string, { expiresIn: "7d", ...options });

export const getTokenFromCookie = async (request: Request) => {
  const cookieHeader = await request.headers.get("cookie")
  // if (!cookieHeader) {
  //   console.log("getTokenFromCookie: No Cookie header found. Returning null")
  //   return null
  // }
  const { token } = await cookieStore.parse(cookieHeader)
  return token
}

export const getUserFromToken = async (token: string) => {
  const id = await jwt.verify(token, process.env.JWT_SECRECT_KEY as string)
  console.log("idd",id)
  return id.id
}