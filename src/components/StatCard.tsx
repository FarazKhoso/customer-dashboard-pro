import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down';
  avatars?: string[];
  delay?: number;
  suffix?: string;
  prefix?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  trend, 
  avatars, 
  delay = 0,
  suffix = '',
  prefix = ''
}: StatCardProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return val.toLocaleString();
    return val.toString();
  };

  return (
    <div 
      className="bg-card rounded-xl p-6 stat-card-shadow animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">
            {prefix}{formatValue(value)}{suffix}
          </p>
        </div>
        
        {avatars && avatars.length > 0 && (
          <div className="flex -space-x-2">
            {avatars.slice(0, 5).map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-card object-cover"
              />
            ))}
          </div>
        )}
      </div>
      
      {change !== undefined && trend && (
        <div className="mt-4 flex items-center gap-1">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <span className={cn(
            "text-sm font-medium",
            trend === 'up' ? "text-success" : "text-destructive"
          )}>
            {trend === 'up' ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-muted-foreground ml-1">this month</span>
        </div>
      )}
    </div>
  );
}
