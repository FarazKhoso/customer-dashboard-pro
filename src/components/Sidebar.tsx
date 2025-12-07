import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  Megaphone,
  HelpCircle,
  ChevronRight,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/auth/useAuth';
import { toast } from 'sonner';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'product', label: 'Product', icon: Package, path: '/products' },
  { id: 'customers', label: 'Customers', icon: Users, path: '/customers' },
  { id: 'income', label: 'Income', icon: DollarSign, path: '/income' },
  { id: 'promote', label: 'Promote', icon: Megaphone, path: '/promote' },
  { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
];

export function Sidebar({ isOpen, onClose, activeItem }: SidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
    onClose(); // Close sidebar on mobile after logout
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar sidebar-shadow",
          "flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CRM</span>
            </div>
            <span className="font-semibold text-foreground">Dashboard</span>
            <span className="text-xs text-muted-foreground">v.0.1</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : ""
                )} />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto text-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Banner */}
        <div className="p-4">
          <div className="upgrade-gradient rounded-xl p-4 text-primary-foreground">
            <p className="text-sm font-medium mb-3">
              Upgrade to PRO to get access to all features!
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
            >
              Get Pro Now!
            </Button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user?.user_metadata?.avatar_url || ''}
                alt={user?.user_metadata?.name || 'User'}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.user_metadata?.name
                  ? getInitials(user.user_metadata.name)
                  : user?.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">Project Manager</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
