import { WeightChart } from "@/components/WeightChart";
import { WeightStats } from "@/components/WeightStats";
import { WeightTable } from "@/components/WeightTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { weightData } from "data/weightData";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router";

export const loader = async () => {
  
};

const WeightDashBoard = () => {
  const userId = 123;
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
                Recent Records
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <WeightTable data={weightData} />
            </CardContent>
          </Card>
        </div>
        {/* Floating button */}
        <Link
          to={`/${userId}/input-weight`}
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
