import { WeightChart } from "@/components/WeightChart";
import { WeightStats } from "@/components/WeightStats";
import { WeightTable } from "@/components/WeightTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Users } from "lucide-react";
import Weight from "models/weight.model";
import { Link, redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/weightDashboard";
import { useMemo } from "react";
import date from "date-and-time";
import User from "models/user.model";
import { getTokenFromCookie, getUserFromToken } from "@/cookies.server";

export interface weightRecord {
  time: Date;
  weight: number;
  userId: string;
}

export interface weightRec {       //user sees
  date: string,
  time: string,
  weight: number,
  dayOfWeek: string
}

export const loader = async ({request}: Route.ClientActionArgs) => {
  console.log("inside dashboard")
  const token = await getTokenFromCookie(request)
  console.log("token gen", token)
   if (!token) {
    return redirect("/logout")
  }
  const userId = await getUserFromToken(token)
  console.log("userId is weightDashboard", userId)
  
  const data = await Weight.find({ userId });
  console.log("data",data)
  return Response.json({
    data,
    userId,
  });
};

const WeightDashBoard = () => {
  const { userId, data } = useLoaderData();

  const weightData = useMemo(() => {
    return data.map((info: weightRecord) => {
      const pattern1 = date.compile("ddd, MMM DD YYYY");
      const pattern2 = date.compile("hh:mm A [GMT]Z");
      const dd = date.format(new Date(info.time), pattern1);
      const t = date.format(new Date(info.time), pattern2);
      const setDate = dd.substring(5).split(' ')
      const set = setDate[1] + "-" + setDate[0]
      console.log("firsttry",set)
      console.log("setDate",setDate)
      return {
        date: set,
        time: t.substring(0,8),
        weight: info.weight,
        dayOfWeek: dd.substring(0,3),
      };
    });
  }, [data, userId]);
  console.log("weightData",weightData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      
      <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">
            Weight Track Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg">
            Monitor your fitness journey with detailed analytics
          </p>
        </div>

        <WeightStats data={weightData} />

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
                Weight Progress Chart
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <WeightChart data={weightData} />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
                All Records
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <WeightTable data={ weightData } userId={userId}/>
            </CardContent>
          </Card>
        </div>
        {/* Floating button */}
        <Link
          to={`/weight-input`}
          className="fixed bottom-8 right-8 z-40"
        >
          <button className="bg-orange-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            <PlusCircle size={28} />
          </button>
        </Link>

        {/* Label beside button */}
        <p className="fixed bottom-12 right-25 z-40 text-orange-400 text-sm hidden md:block">
          add weight
        </p>
      </div>
    </div>
  );
};

export default WeightDashBoard;
