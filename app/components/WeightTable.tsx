import type { weightRec } from "@/routes/weightDashboard";
import { useState } from "react";

interface WeightTableProps {
  data: weightRec[];
  userId: string;
}

export const WeightTable = ({ data, userId }: WeightTableProps) => {
  const [show,setShow] = useState(false)
  const recentData = show ? [...data].reverse() : [...data].reverse().slice(0, 6)

  function toggle() {
    setShow((prev) => !prev)
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {recentData.map((record, index) => {
        const prevRecord = data[data.length - 1 - index - 1];
        const weightChange = prevRecord ? record.weight - prevRecord.weight : 0;

        return (
          <div
            key={`${record.date}-${record.time}`}
            className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 capitalize text-sm sm:text-base truncate">
                {record.date}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                {record.time}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-base sm:text-lg font-bold text-gray-800">
                {record.weight} KG
              </div>
              {weightChange !== 0 && (
                <div
                  className={`text-xs sm:text-sm font-medium ${
                    weightChange > 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {weightChange > 0 ? "+" : ""}
                  {weightChange.toFixed(2)} KG
                </div>
              )}
            </div>
          </div>
        );
      })}
      {data.length > 6 && (
        <div className="text-center pt-2 sm:pt-3">
          <button
            className="text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium"
            onClick={toggle}
          >
            {show ? (<>View Less Records</>):(<>View All Records ({data.length} total)</>)}
          </button>
        </div>
      )}
    </div>
  );
};
