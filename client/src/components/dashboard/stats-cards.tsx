import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, ShoppingBag, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalRevenue: number;
  totalCapital: number;
  totalProfit: number;
  totalTransactions: number;
  averageTransactionValue: number;
}

const statsConfig = [
  {
    key: 'totalRevenue' as const,
    label: 'Total Revenue',
    icon: DollarSign,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    formatter: formatCurrency,
  },
  {
    key: 'totalTransactions' as const,
    label: 'Total Transactions',
    icon: ShoppingBag,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    formatter: (value: number) => value.toLocaleString(),
  },
  {
    key: 'totalProfit' as const,
    label: 'Total Profit',
    icon: TrendingUp,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    formatter: formatCurrency,
  },
  {
    key: 'averageTransactionValue' as const,
    label: 'Avg Transaction',
    icon: Users,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    formatter: formatCurrency,
  },
];

export function StatsCards() {
  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["https://8666-180-254-78-32.ngrok-free.app/api/dashboard/stats"],
  });

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6">
            <CardContent className="p-0">
              <div className="text-center text-red-600">
                <p className="text-sm">Failed to load stats</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {statsConfig.map((config, index) => {
        const Icon = config.icon;
        const value = stats?.[config.key];
        
        return (
          <Card key={config.key} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {config.label}
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-24 mt-1" />
                  ) : (
                    <p className="text-3xl font-bold text-slate-900">
                      {value ? config.formatter(value) : '0'}
                    </p>
                  )}
                  <p className="text-sm text-slate-500 mt-1">Real-time data</p>
                </div>
                <div className={`p-3 ${config.bgColor} rounded-full`}>
                  <Icon className={`w-6 h-6 ${config.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
