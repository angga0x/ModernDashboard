import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Users,
  ShoppingCart,
  DollarSign
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar title="Analytics Dashboard" />
        
        <main className="p-6 space-y-6">
          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,234</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,456</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -0.2% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Per Visitor</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 356,400</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="traffic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
              <TabsTrigger value="behavior">User Behavior</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="traffic" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Traffic Sources</CardTitle>
                    <CardDescription>Where your visitors are coming from</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Organic Search</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">45.2%</span>
                        <Badge variant="secondary">+2.1%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Direct Traffic</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">32.1%</span>
                        <Badge variant="secondary">+1.5%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Social Media</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">15.8%</span>
                        <Badge variant="destructive">-0.8%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Referral</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">6.9%</span>
                        <Badge variant="secondary">+0.3%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Popular Pages</CardTitle>
                    <CardDescription>Most visited pages this month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">/dashboard</span>
                      <span className="text-sm font-medium">8,234 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">/analytics</span>
                      <span className="text-sm font-medium">4,123 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">/users</span>
                      <span className="text-sm font-medium">2,456 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">/orders</span>
                      <span className="text-sm font-medium">1,789 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">/settings</span>
                      <span className="text-sm font-medium">987 views</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Behavior Metrics</CardTitle>
                  <CardDescription>How users interact with your application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">3m 24s</div>
                      <p className="text-sm text-muted-foreground">Average Session Duration</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">4.2</div>
                      <p className="text-sm text-muted-foreground">Pages Per Session</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">32%</div>
                      <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demographics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Demographics</CardTitle>
                  <CardDescription>Geographic and demographic information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Top Countries</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">United States</span>
                          <span className="text-sm font-medium">42.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">United Kingdom</span>
                          <span className="text-sm font-medium">18.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Canada</span>
                          <span className="text-sm font-medium">12.1%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Germany</span>
                          <span className="text-sm font-medium">8.9%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Device Types</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Desktop</span>
                          <span className="text-sm font-medium">58.4%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Mobile</span>
                          <span className="text-sm font-medium">34.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Tablet</span>
                          <span className="text-sm font-medium">7.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Website performance and loading times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">1.2s</div>
                      <p className="text-sm text-muted-foreground">Average Load Time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">98.5%</div>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">89</div>
                      <p className="text-sm text-muted-foreground">Performance Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">0.1%</div>
                      <p className="text-sm text-muted-foreground">Error Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}