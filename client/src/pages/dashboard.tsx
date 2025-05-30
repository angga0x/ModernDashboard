import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { TopProducts } from "@/components/dashboard/top-products";
import { TransactionsTable } from "@/components/dashboard/transactions-table";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <TopBar title="Dashboard Overview" />
        
        <main className="p-6 space-y-6">
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
