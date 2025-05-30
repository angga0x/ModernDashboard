import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { 
  Home, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Settings 
} from "lucide-react";
import { Link, useLocation } from "wouter";

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const [location] = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={close}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-center h-16 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        </div>
        
        <nav className="mt-8 px-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-slate-700 rounded-lg transition-colors group",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "hover:bg-slate-100"
                )}
                onClick={() => window.innerWidth < 1024 && close()}
              >
                <Icon className={cn(
                  "w-5 h-5 mr-3 transition-colors",
                  isActive 
                    ? "text-blue-600" 
                    : "text-slate-500 group-hover:text-slate-700"
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
