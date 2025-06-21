import { Card, CardContent } from "@/components/ui/card";
import type { WeightRecord } from "data/weightData";
import { ArrowDown, ArrowUp } from "lucide-react";

interface WeightStatsProps {
  data: WeightRecord[];
}

export const WeightStats = ({ data }: WeightStatsProps) => {
  const currentWeight = data[data.length - 1]?.weight || 0;
  const startWeight = data[0]?.weight || 0;
  const weightLoss = startWeight - currentWeight;
  const weightLossPercentage = ((weightLoss / startWeight) * 100);
  
  const minWeight = Math.min(...data.map(d => d.weight));
  const maxWeight = Math.max(...data.map(d => d.weight));
  const averageWeight = data.reduce((sum, d) => sum + d.weight, 0) / data.length;

  const stats = [
    {
      title: "Current Weight",
      value: `${currentWeight} KG`,
      subtitle: "Latest measurement",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Weight Lost",
      value: `${weightLoss.toFixed(2)} KG`,
      subtitle: `${weightLossPercentage.toFixed(1)}% decrease`,
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      title: "Average Weight",
      value: `${averageWeight.toFixed(2)} KG`,
      subtitle: "Over tracking period",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Weight Range",
      value: `${minWeight} - ${maxWeight} KG`,
      subtitle: "Min to Max range",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} border-0 shadow-md hover:shadow-lg transition-shadow duration-200`}>
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</h3>
              {stat.icon && <div className={stat.color}>{stat.icon}</div>}
            </div>
            <div className={`text-lg sm:text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};