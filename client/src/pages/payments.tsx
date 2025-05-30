import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Download,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  DollarSign,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const payments = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    customer: "John Doe",
    amount: 299.99,
    method: "Credit Card",
    cardLast4: "4242",
    status: "Completed",
    date: "2024-05-30T10:30:00Z",
    transactionId: "txn_1OxYZ123456789"
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    customer: "Sarah Wilson",
    amount: 149.99,
    method: "PayPal",
    cardLast4: null,
    status: "Completed",
    date: "2024-05-29T14:15:00Z",
    transactionId: "txn_2AbC987654321"
  },
  {
    id: "PAY-003",
    orderId: "ORD-003",
    customer: "Mike Johnson",
    amount: 749.99,
    method: "Credit Card",
    cardLast4: "5555",
    status: "Pending",
    date: "2024-05-30T09:45:00Z",
    transactionId: "txn_3DeF456789123"
  },
  {
    id: "PAY-004",
    orderId: "ORD-004",
    customer: "Emily Brown",
    amount: 199.99,
    method: "Bank Transfer",
    cardLast4: null,
    status: "Processing",
    date: "2024-05-30T16:20:00Z",
    transactionId: "txn_4GhI789123456"
  },
  {
    id: "PAY-005",
    orderId: "ORD-005",
    customer: "David Lee",
    amount: 99.99,
    method: "Credit Card",
    cardLast4: "1234",
    status: "Failed",
    date: "2024-05-27T11:10:00Z",
    transactionId: "txn_5JkL123456789"
  }
];

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'processing':
      return <RefreshCw className="h-4 w-4" />;
    case 'failed':
      return <XCircle className="h-4 w-4" />;
    case 'refunded':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getMethodIcon(method: string) {
  switch (method.toLowerCase()) {
    case 'credit card':
      return <CreditCard className="h-4 w-4" />;
    case 'paypal':
      return <DollarSign className="h-4 w-4" />;
    case 'bank transfer':
      return <DollarSign className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
}

export default function Payments() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar title="Payment Management" />
        
        <main className="p-6 space-y-6">
          {/* Payment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 1,823,640,000</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Payments</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,387</div>
                <p className="text-xs text-muted-foreground">98.2% success rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">43</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                  -5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Track and manage payment transactions</CardDescription>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export Payments
                </Button>
              </div>
              
              {/* Search and Filters */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search payments..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{payment.customer}</div>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto font-normal">
                          {payment.orderId}
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getMethodIcon(payment.method)}
                          <span>{payment.method}</span>
                          {payment.cardLast4 && (
                            <span className="text-sm text-muted-foreground">••••{payment.cardLast4}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`${getStatusColor(payment.status)} flex items-center w-fit gap-1`}>
                          {getStatusIcon(payment.status)}
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(payment.date)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Retry Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <AlertCircle className="h-4 w-4 mr-2" />
                              Refund Payment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Payment Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Methods</CardTitle>
                <CardDescription>Distribution of payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">Credit Card</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">67.5%</span>
                    <Badge variant="secondary">Rp 1,232,658,550</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">PayPal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">23.8%</span>
                    <Badge variant="secondary">Rp 434,020,800</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">Bank Transfer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">8.7%</span>
                    <Badge variant="secondary">Rp 156,540,450</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Insights</CardTitle>
                <CardDescription>Key payment metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Transaction</span>
                  <span className="font-medium">Rp 2,287,400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Processing Time</span>
                  <span className="font-medium">2.3 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Refund Rate</span>
                  <span className="font-medium">1.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Growth</span>
                  <span className="font-medium text-green-600">+15.4%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common payment tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Process Pending
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Review Failed
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Reconciliation Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Process Refunds
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}