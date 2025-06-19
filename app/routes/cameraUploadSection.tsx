import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/cameraUploadSection";

export const loader = async ({ params }: Route.ComponentProps) => {
  const userId = params.userId;
  console.log(userId);
  return Response.json({
    userId,
  });
};

const CameraUploadSection = () => {
  const { userId } = useLoaderData();
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Track Your Weight
          </h1>

          {/* Camera upload section */}
          <div id="cameraUploadForm" className="space-y-6">
            <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
              <i className="fas fa-camera text-orange-500 mr-3"></i> Upload from
              Camera
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Take a picture to log your weight effortlessly.
            </p>

            <button
              type="button"
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-medium shadow-md mb-4"
            >
              <i className="fas fa-camera-retro mr-2"></i> Open Camera
            </button>
            <Link to={`/${userId}/input-weight`}>
              <button
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

export default CameraUploadSection;
