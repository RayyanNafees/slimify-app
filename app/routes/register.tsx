import React from "react";
import { Form, Link, redirect, useActionData } from "react-router";
import type { Route } from "./+types/register";
import User from "models/user.model";

export const loader = async () => {
  console.log("Connecting to MongoDB...");
  import("mongoose").then((mongoose) =>
    mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => console.log("MongoDB connected"))
      .catch((e) => {
        console.log("MongoDB connection error:", e);
        throw e;
      })
  );
};

export const action = async ({ request }: Route.ClientActionArgs) => {
  if (request.method == "POST") {
    const fd = await request.formData();
    const email = fd.get("email");
    const password = fd.get("password");
    const confirm = fd.get("confirm-password");

    if (password != confirm) {
      return Response.json({ message: "Passwords should match" });
    }

    if (await User.findOne({email})) {
      return Response.json({ message: "User already exists with this account"})
    }

    const user = new User ({
      email,
      password
    })
    await user.save()

    return redirect(`/login`)

  }
};

const Register = () => {
  const data = useActionData();
  return (
    <>
      <div className="min-h-screen bg-red-50 text-gray-800 flex items-center justify-center p-4 font-sans antialiased">
        <main className="w-full max-w-md mx-auto">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center tracking-tight">
              Join Slimify
            </h2>

            <Form
              method="post"
              className="space-y-6 sm:space-y-7"
              reloadDocument
            >
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
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base shadow-inner"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  name="confirm-password"
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-3 sm:py-3.5 px-6 rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white text-lg shadow-lg"
              >
                Register Account
              </button>
            </Form>
            <p className="text-center text-gray-600 mt-3 sm:mt-6 text-sm">
              Already have an account?{" "}
              <Link
                to={`/login`}
                className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
