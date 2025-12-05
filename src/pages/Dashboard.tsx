import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { customers, stats } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const navigate = useNavigate();

  const columns = [
    {
      key: 'name',
      label: 'Customer Name',
      render: (customer: typeof customers[0]) => (
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
      render: (customer: typeof customers[0]) => (
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

      {/* Customer Table */}
      <DataTable
        title="All Customers"
        subtitle="Active Members"
        data={customers}
        columns={columns}
        searchKeys={['name', 'email', 'company']}
        onRowClick={(customer) => navigate(`/customers/${customer.id}`)}
        exportFileName="customers"
        totalEntries={256000}
      />
    </>
  );
};

export default Dashboard;
