import { createCookie } from "react-router";
import jwt from "jsonwebtoken";
import process from "node:process";

export const cookieStore = createCookie("cookie-store", {
  maxAge: 604_800, // one week
});

export const createToken = (data:{}, options = {}) =>
  jwt.sign(data, 'affan-ahmad', { expiresIn: "7d", ...options });

export const getTokenFromCookie = async (request: Request) => {
  const cookieHeader = await request.headers.get("cookie")
  // if (!cookieHeader) {
  //   console.log("getTokenFromCookie: No Cookie header found. Returning null")
  //   return null
  // }
  const { token } = await cookieStore.parse(cookieHeader)
  console.log("tokenn",token)
  return token
}

export const getUserFromToken = async (token: string) => {
  console.log("till here")
  console.log("JWT_SECRET_KEY value:", process.env.JWT_SECRET_KEY); 
  // const id = await jwt.verify(token, process.env.JWT_SECRECT_KEY as string)
    const id = await jwt.verify(token, 'affan-ahmad')
  console.log("idd",id)
  return id.id
}