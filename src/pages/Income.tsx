import { useState } from 'react';
import { Plus } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { invoices, incomeStats, revenueData, Invoice } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { InvoiceModal } from '@/components/InvoiceModal';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Income = () => {
  const [invoiceList, setInvoiceList] = useState(invoices);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInvoices = statusFilter === 'all' 
    ? invoiceList 
    : invoiceList.filter(inv => inv.status.toLowerCase() === statusFilter);

  const handleSave = (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: String(invoiceList.length + 1),
      invoiceNumber: `INV-${String(invoiceList.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setInvoiceList(prev => [...prev, newInvoice]);
    toast.success('Invoice created successfully!');
  };

  const columns = [
    { key: 'invoiceNumber', label: 'Invoice #' },
    { key: 'customerName', label: 'Customer', hidden: 'hidden md:table-cell' },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (invoice: Invoice) => (
        <span className="font-semibold">${invoice.amount.toLocaleString()}</span>
      ),
    },
    { key: 'dueDate', label: 'Due Date', hidden: 'hidden lg:table-cell' },
    {
      key: 'status',
      label: 'Status',
      render: (invoice: Invoice) => (
        <span className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
          invoice.status === 'Paid' && "badge-active",
          invoice.status === 'Pending' && "bg-amber-100 text-amber-700 border border-amber-200",
          invoice.status === 'Overdue' && "badge-inactive"
        )}>
          {invoice.status}
        </span>
      ),
    },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={incomeStats.totalRevenue.value}
          change={incomeStats.totalRevenue.change}
          trend="up"
          prefix="$"
          delay={0}
        />
        <StatCard
          title="This Month"
          value={incomeStats.thisMonth.value}
          change={incomeStats.thisMonth.change}
          trend="up"
          prefix="$"
          delay={100}
        />
        <StatCard
          title="Pending Invoices"
          value={incomeStats.pendingInvoices.value}
          change={incomeStats.pendingInvoices.change}
          trend="down"
          prefix="$"
          delay={200}
        />
        <StatCard
          title="Overdue"
          value={incomeStats.overdueInvoices.value}
          change={incomeStats.overdueInvoices.change}
          trend="down"
          prefix="$"
          delay={300}
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-card rounded-xl p-6 stat-card-shadow mb-8 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h3 className="text-lg font-semibold mb-6">Monthly Revenue</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(262, 52%, 47%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(262, 52%, 47%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(220, 10%, 46%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(220, 10%, 46%)"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(262, 52%, 47%)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoices Table */}
      <DataTable
        title="Invoices"
        subtitle="All transactions"
        data={filteredInvoices}
        columns={columns}
        searchKeys={['invoiceNumber', 'customerName']}
        exportFileName="invoices"
        actions={
          <>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Invoice
            </Button>
          </>
        }
      />

      <InvoiceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
      />
    </>
  );
};

export default Income;
