import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/manualInputSection";

export const loader = async ({ params }: Route.ComponentProps) => {
  const userId = params.userId;
  console.log(userId);
  return Response.json({
    userId,
  });
};

const ManualInputSection = () => {
  const { userId } = useLoaderData();
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Track Your Weight
          </h1>

          {/* Manual upload section */}
          <div id="manualInputForm" className="space-y-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
              <i className="fas fa-calendar-alt text-red-500 mr-3"></i> Manual Entry
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Select a date and enter your weight for that day.
            </p>

            <div className="mb-4">
              <label
                htmlFor="weightDate"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Select Date:
              </label>
              <input
                type="date"
                id="weightDate"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="weightInput"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Enter Weight (kg):
              </label>
              <div className="relative mt-1 rounded-lg shadow-sm">
                <input
                  type="number"
                  id="weightInput"
                  placeholder="e.g., 75.5"
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-800 pr-12"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm" id="weight-unit">
                    kg
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-medium shadow-md mb-4"
            >
              <i className="fas fa-save mr-2"></i> Save Weight
            </button>
            <Link to={`/${userId}/input-weight`}>
              <button
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-150 ease-in-out text-sm"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Selection
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManualInputSection;
