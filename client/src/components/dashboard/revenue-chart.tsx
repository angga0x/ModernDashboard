import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface SalesTrendResponse {
  params: {
    granularity: string;
    metric: string;
    period: string;
  };
  filterApplied: {
    gte: string;
    lte: string;
  };
  data: {
    date: string;
    value: number;
  }[];
}

export function RevenueChart() {
  const { data: salesTrendResponse, isLoading, error } = useQuery<SalesTrendResponse>({
    queryKey: ["https://8666-180-254-78-32.ngrok-free.app/api/dashboard/sales-trend?granularity=daily&metric=revenue&period=last30days"],
  });

  const chartData = salesTrendResponse?.data?.map(item => ({
    day: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: item.value
  })) || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Revenue Overview
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
              7D
            </Button>
            <Button variant="ghost" size="sm" className="px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-full">
              30D
            </Button>
            <Button variant="ghost" size="sm" className="px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-full">
              90D
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-red-600">
              <p className="text-sm">Failed to load revenue data</p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="h-48 w-full" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <p className="text-sm">No revenue data available</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={256}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Revenue']}
                labelStyle={{ color: '#334155' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#3b82f6" 
                radius={[2, 2, 0, 0]}
                className="transition-all duration-300 hover:opacity-80"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
