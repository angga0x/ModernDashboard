import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Database,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar title="Settings" />
        
        <main className="p-6 space-y-6">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 234 567 8900" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                      </div>
                      <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Notification Types</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label className="text-sm">Order updates</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label className="text-sm">Payment confirmations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label className="text-sm">Security alerts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label className="text-sm">Weekly reports</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input 
                          id="currentPassword" 
                          type={showPassword ? "text" : "password"} 
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    
                    <Button>
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm">SMS Authentication</p>
                        <p className="text-xs text-muted-foreground">Receive codes via SMS</p>
                      </div>
                      <Badge variant="outline">Not Configured</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Setup SMS 2FA
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Active Sessions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">Chrome on Mac • New York, NY</p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View All Sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Billing & Subscription
                  </CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium">Pro Plan</h4>
                        <p className="text-sm text-muted-foreground">Rp 425,100/month • Next billing: June 30, 2024</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </Button>
                      <Button variant="outline">
                        Change Plan
                      </Button>
                      <Button variant="outline">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Payment Methods</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/26</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Payment Method
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Billing History</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>May 30, 2024</span>
                        <span>Rp 425,100</span>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>April 30, 2024</span>
                        <span>Rp 425,100</span>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View All Invoices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Integrations
                  </CardTitle>
                  <CardDescription>Connect your account with third-party services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-6 w-6" />
                          <div>
                            <h4 className="font-medium">Email Service</h4>
                            <p className="text-sm text-muted-foreground">SendGrid</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Connected</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Send transactional emails and notifications
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Configure
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-6 w-6" />
                          <div>
                            <h4 className="font-medium">Payment Gateway</h4>
                            <p className="text-sm text-muted-foreground">Stripe</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Connected</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Process payments and manage subscriptions
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Configure
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Database className="h-6 w-6" />
                          <div>
                            <h4 className="font-medium">Analytics</h4>
                            <p className="text-sm text-muted-foreground">Google Analytics</p>
                          </div>
                        </div>
                        <Badge variant="outline">Not Connected</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Track user behavior and website analytics
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Connect
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Bell className="h-6 w-6" />
                          <div>
                            <h4 className="font-medium">Notifications</h4>
                            <p className="text-sm text-muted-foreground">Slack</p>
                          </div>
                        </div>
                        <Badge variant="outline">Not Connected</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Receive notifications in your Slack workspace
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>Advanced configuration and data management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Data Export</h4>
                    <p className="text-sm text-muted-foreground">
                      Export your data in various formats for backup or migration purposes.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export JSON
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Full Backup
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Data Import</h4>
                    <p className="text-sm text-muted-foreground">
                      Import data from external sources or previous backups.
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop your files here or click to browse
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-red-600">Danger Zone</h4>
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-medium text-red-800">Delete Account</h5>
                          <p className="text-sm text-red-700 mb-3">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
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