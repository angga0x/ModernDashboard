import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, PlusCircle, FileText, Settings, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const quickActions = [
  {
    icon: UserPlus,
    label: "Add New User",
    href: "/users/new",
  },
  {
    icon: PlusCircle,
    label: "Create Order",
    href: "/orders/new",
  },
  {
    icon: FileText,
    label: "Generate Report",
    href: "/reports",
  },
  {
    icon: Settings,
    label: "Manage Settings",
    href: "/settings",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          
          return (
            <Link key={action.href} href={action.href}>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group h-auto"
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 text-slate-600 mr-3 group-hover:text-slate-800" />
                  <span className="font-medium text-slate-900">{action.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              </Button>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
