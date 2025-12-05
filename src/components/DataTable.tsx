import { useState, useMemo, ReactNode } from 'react';
import { Search, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  hidden?: string; // responsive class like 'hidden md:table-cell'
}

interface DataTableProps<T> {
  title: string;
  subtitle?: string;
  data: T[];
  columns: Column<T>[];
  searchKeys: (keyof T)[];
  onRowClick?: (item: T) => void;
  actions?: ReactNode;
  loading?: boolean;
  exportFileName?: string;
  totalEntries?: number;
}

export function DataTable<T extends { id: string }>({
  title,
  subtitle,
  data,
  columns,
  searchKeys,
  onRowClick,
  actions,
  loading = false,
  exportFileName,
  totalEntries,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = useMemo(() => {
    let filtered = data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (sortBy === 'newest') {
      filtered = [...filtered].reverse();
    } else if (sortBy === 'oldest') {
      filtered = [...filtered];
    }

    return filtered;
  }, [data, searchQuery, sortBy, searchKeys]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const showingStart = filteredData.length > 0 ? startIndex + 1 : 0;
  const showingEnd = Math.min(startIndex + itemsPerPage, filteredData.length);
  const displayTotal = totalEntries || filteredData.length;

  const handleExport = () => {
    if (!exportFileName) return;
    const csv = [
      columns.map(c => c.label).join(','),
      ...filteredData.map(item => 
        columns.map(c => {
          const value = (item as any)[c.key];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportFileName}.csv`;
    a.click();
    toast.success(`${title} exported successfully!`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4);
      if (totalPages > 5) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="bg-card rounded-xl stat-card-shadow">
        <div className="p-6 border-b border-border">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl stat-card-shadow animate-fade-up">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {subtitle && <p className="text-sm text-success">{subtitle}</p>}
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 w-full sm:w-[200px]"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>

            {exportFileName && (
              <Button variant="outline" size="icon" onClick={handleExport} aria-label="Export to CSV">
                <Download className="w-4 h-4" />
              </Button>
            )}

            {actions}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className={cn(
                    "text-left py-4 px-6 text-sm font-medium text-muted-foreground",
                    col.hidden
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr 
                key={item.id} 
                className={cn(
                  "table-row-hover border-b border-border last:border-0",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(item)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {columns.map((col) => (
                  <td 
                    key={col.key} 
                    className={cn("py-4 px-6", col.hidden)}
                  >
                    {col.render ? col.render(item) : String((item as any)[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing data {showingStart} to {showingEnd} of {displayTotal.toLocaleString()} entries
        </p>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {getPageNumbers().map((page, idx) => (
            typeof page === 'number' ? (
              <Button
                key={idx}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-9 h-9",
                  currentPage === page && "bg-primary text-primary-foreground"
                )}
              >
                {page}
              </Button>
            ) : (
              <span key={idx} className="text-muted-foreground px-2">{page}</span>
            )
          ))}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
