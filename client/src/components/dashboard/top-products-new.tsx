import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Package } from "lucide-react";

interface TopProductsResponse {
  params: {
    limit: number;
    orderBy: string;
  };
  data: Array<{
    productCode: string;
    productName: string;
    unitsSold: number;
    totalRevenue: number;
    totalProfit: number;
  }>;
}

export function TopProducts() {
  const { data: topProductsResponse, isLoading, error } = useQuery<TopProductsResponse>({
    queryKey: ["/api/external/dashboard/top-products"],
  });

  const products = topProductsResponse?.data || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Package className="w-5 h-5 mr-2 text-blue-600" />
            Top Products
          </CardTitle>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            By Revenue
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center text-red-600 py-4">
            <p className="text-sm">Failed to load top products</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">No products data available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product, index) => (
              <div key={product.productCode} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{product.productName}</p>
                    <p className="text-xs text-slate-500">Code: {product.productCode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 text-sm">
                    {formatCurrency(product.totalRevenue)}
                  </p>
                  <div className="flex items-center justify-end space-x-1">
                    <span className="text-xs text-slate-500">{product.unitsSold} sold</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs ml-1">{formatCurrency(product.totalProfit)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}