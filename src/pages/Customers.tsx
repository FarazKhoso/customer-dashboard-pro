import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Download } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { customers, stats, Customer } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { CustomerModal } from '@/components/CustomerModal';
import { toast } from 'sonner';

const Customers = () => {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState(customers);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSave = (customer: Omit<Customer, 'id'>) => {
    const newCustomer = { ...customer, id: String(customerList.length + 1) };
    setCustomerList(prev => [...prev, newCustomer]);
    toast.success('Customer added successfully!');
  };

  const handleBulkDelete = () => {
    setCustomerList(prev => prev.filter(c => !selectedIds.includes(c.id)));
    toast.success(`${selectedIds.length} customers deleted`);
    setSelectedIds([]);
  };

  const handleBulkExport = () => {
    const selected = customerList.filter(c => selectedIds.includes(c.id));
    const csv = [
      ['Name', 'Company', 'Phone', 'Email', 'Country', 'Status'].join(','),
      ...selected.map(c => 
        [c.name, c.company, c.phone, c.email, c.country, c.status].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-customers.csv';
    a.click();
    toast.success('Selected customers exported!');
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const columns = [
    {
      key: 'select',
      label: '',
      render: (customer: Customer) => (
        <Checkbox
          checked={selectedIds.includes(customer.id)}
          onCheckedChange={() => toggleSelect(customer.id)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      key: 'name',
      label: 'Customer Name',
      render: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium text-foreground">{customer.name}</span>
        </div>
      ),
    },
    { key: 'company', label: 'Company', hidden: 'hidden md:table-cell' },
    { key: 'phone', label: 'Phone Number', hidden: 'hidden lg:table-cell' },
    { key: 'email', label: 'Email', hidden: 'hidden sm:table-cell' },
    { key: 'country', label: 'Country', hidden: 'hidden xl:table-cell' },
    {
      key: 'status',
      label: 'Status',
      render: (customer: Customer) => (
        <span className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
          customer.status === 'Active' ? "badge-active" : "badge-inactive"
        )}>
          {customer.status}
        </span>
      ),
    },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers.value}
          change={stats.totalCustomers.change}
          trend={stats.totalCustomers.trend}
          delay={0}
        />
        <StatCard
          title="Members"
          value={stats.members.value}
          change={stats.members.change}
          trend={stats.members.trend}
          delay={100}
        />
        <StatCard
          title="Active Now"
          value={stats.activeNow.value}
          avatars={stats.activeNow.avatars}
          delay={200}
        />
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-4 bg-muted rounded-lg flex items-center justify-between animate-fade-up">
          <span className="text-sm font-medium">{selectedIds.length} selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleBulkExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Customer Table */}
      <DataTable
        title="All Customers"
        subtitle="Active Members"
        data={customerList}
        columns={columns}
        searchKeys={['name', 'email', 'company']}
        onRowClick={(customer) => navigate(`/customers/${customer.id}`)}
        exportFileName="customers"
        totalEntries={256000}
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Customer
          </Button>
        }
      />

      <CustomerModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
      />
    </>
  );
};

export default Customers;
