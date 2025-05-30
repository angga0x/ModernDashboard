import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { StatsCards } from "@/components/dashboard/stats-cards-new";
import { RevenueChart } from "@/components/dashboard/revenue-chart-new";
import { TopProducts } from "@/components/dashboard/top-products-new";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      // Invalidate all dashboard-related queries to force fresh data fetch
      await queryClient.invalidateQueries({ queryKey: ["/api/external/dashboard/stats"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/external/dashboard/sales-trend"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/external/dashboard/top-products"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/external/dashboard/recent-transactions"] });
      
      // Wait a moment for the queries to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <TopBar title="Dashboard Overview" />
        
        <main className="p-6 space-y-6">
          {/* Refresh Controls */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Dashboard Controls</CardTitle>
                  <CardDescription>Refresh all statistics and data from your API</CardDescription>
                </div>
                <Button 
                  onClick={handleRefreshAll} 
                  disabled={isRefreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh All Data'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Stats Cards */}
          <StatsCards />

          {/* Charts and Top Products Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <TopProducts />
          </div>

          {/* Transactions Table */}
          <TransactionsTable />
        </main>
      </div>
    </div>
  );
}
