import { useState, useMemo } from 'react';
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
import { Customer } from '@/data/mockData';
import { toast } from 'sonner';

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'newest') {
      filtered = [...filtered].reverse();
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [customers, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const totalEntries = 256000;
  const showingStart = startIndex + 1;
  const showingEnd = Math.min(startIndex + itemsPerPage, filteredCustomers.length);

  const handleExport = () => {
    const csv = [
      ['Name', 'Company', 'Phone', 'Email', 'Country', 'Status'].join(','),
      ...filteredCustomers.map(c => 
        [c.name, c.company, c.phone, c.email, c.country, c.status].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    toast.success('Customers exported successfully!');
  };

  return (
    <div className="bg-card rounded-xl stat-card-shadow animate-fade-up" style={{ animationDelay: '300ms' }}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">All Customers</h2>
            <p className="text-sm text-success">Active Members</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={handleExport} aria-label="Export to CSV">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Customer Name</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden md:table-cell">Company</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden lg:table-cell">Phone Number</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden sm:table-cell">Email</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden xl:table-cell">Country</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer, index) => (
              <tr 
                key={customer.id} 
                className="table-row-hover border-b border-border last:border-0 cursor-pointer"
                style={{ animationDelay: `${400 + index * 50}ms` }}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-foreground">{customer.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-muted-foreground hidden md:table-cell">{customer.company}</td>
                <td className="py-4 px-6 text-muted-foreground hidden lg:table-cell">{customer.phone}</td>
                <td className="py-4 px-6 text-muted-foreground hidden sm:table-cell">{customer.email}</td>
                <td className="py-4 px-6 text-muted-foreground hidden xl:table-cell">{customer.country}</td>
                <td className="py-4 px-6">
                  <span className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                    customer.status === 'Active' ? "badge-active" : "badge-inactive"
                  )}>
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing data {showingStart} to {showingEnd} of {totalEntries.toLocaleString()} entries
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
          
          {[1, 2, 3, 4].map((page) => (
            <Button
              key={page}
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
          ))}
          
          <span className="text-muted-foreground px-2">...</span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(40)}
            className={currentPage === 40 ? "bg-primary text-primary-foreground" : ""}
          >
            40
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
