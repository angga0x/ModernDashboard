import { Menu, Bell } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export function TopBar({ title = "Dashboard Overview" }: { title?: string }) {
  const { toggle } = useSidebar();
  
  const { data: user } = useQuery<CurrentUser>({
    queryKey: ["/api/user/current"],
  });

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-4 p-2"
            onClick={toggle}
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </Button>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <Button variant="ghost" size="sm" className="relative p-2 rounded-full">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                {user?.name || "Loading..."}
              </p>
              <p className="text-xs text-slate-500">
                {user?.role || ""}
              </p>
            </div>
            <Avatar className="w-10 h-10 border-2 border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
