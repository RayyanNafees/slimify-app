import { Form, Link, redirect, useActionData } from "react-router";
import type { Route } from "./+types/login";
import User from "models/user.model";
import { cookieStore, createToken } from "../cookies.server";
import md5 from "md5";

interface emailUser {
  password: string;
  email: string;
  id: string;
}

// import process from 'node:process'
import mongoose from "mongoose";
import { useState } from "react";
export const loader = async () => {
  // console.log({mongoURI: process.env.MONGO_URI})
  console.log("Connecting to MongoDB...");
  mongoose
    .connect(
      "mongodb+srv://affan:AHKMAd1234@nodeexpressprojects.w84wr.mongodb.net/slimify?retryWrites=true&w=majority&appName=NodeExpressProjects"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((e) => {
      console.log("MongoDB connection error:", e);
      throw e;
    });
};

export const action = async ({ request }: Route.ClientActionArgs) => {
  if (request.method == "POST") {
    const fd = await request.formData();
    const email = fd.get("email");
    const password = fd.get("password");

    const EmailUser: emailUser | null = await User.findOne({ email });

    if (!EmailUser) {
      return Response.json({ message: "User does not exist" });
    }

    if (typeof password == "string") {
      // const passwordMatch = await dcodeIO.bcrypt.compareSync(password, EmailUser.password);
      const check = md5(password);
      console.log(check);
      const passwordMatch = check == EmailUser.password;
      console.log("passwordMatch", passwordMatch);
      if (!passwordMatch) {
        return Response.json({ message: "Incorrect password" });
      }
    }
    const token = await createToken({ id: EmailUser.id });
    console.log("token in Login", token);
    if (!token) return new Response("No token set");
    return redirect(`/weight-dashboard`, {
      headers: { "Set-Cookie": await cookieStore.serialize({ token }) },
    });
  }
  return null;
};

const Login = () => {
  const [count, setCount] = useState(0)
  const data = useActionData();
  function hndlecount() {
    console.log("inside login")
    setCount(prev => prev + 1)
  }
  return (
    <div className="min-h-screen bg-red-50 text-gray-800 flex items-center justify-center p-4 font-sans antialiased">
      <main className="w-full max-w-md mx-auto">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center tracking-tight">
            Welcome Back!
          </h2>
          <button onClick={hndlecount}>{count}</button>

          <Form method="post" className="space-y-6 sm:space-y-7">
            {data?.message && (
              <p className="bg-red-100 border border-red-400 text-red-700 p-3 sm:p-4 rounded-lg text-sm text-center font-medium">
                {data?.message}
              </p>
            )}

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 sm:px-5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base shadow-inner"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Your password"
                required
                className="w-full px-4 py-2.5 sm:px-5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 sm:py-3.5 px-6 rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white text-lg shadow-lg"
            >
              Login to Your Account
            </button>
          </Form>
          <p className="text-center text-gray-600 mt-4 sm:mt-6 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={`/register`}
              className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
