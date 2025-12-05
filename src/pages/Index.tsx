import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { CustomerTable } from '@/components/CustomerTable';
import { customers, stats } from '@/data/mockData';
import { Users, UserCheck, Activity } from 'lucide-react';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('customers');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
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
          <CustomerTable customers={customers} />
        </main>
      </div>
    </div>
  );
};

export default Index;
