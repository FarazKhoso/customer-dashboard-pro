import { useState } from 'react';
import { Plus } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { campaigns, promoteStats, Campaign } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { CampaignModal } from '@/components/CampaignModal';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Promote = () => {
  const [campaignList, setCampaignList] = useState(campaigns);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (campaign: Omit<Campaign, 'id'>) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: String(campaignList.length + 1),
    };
    setCampaignList(prev => [...prev, newCampaign]);
    toast.success('Campaign created successfully!');
  };

  const performanceData = campaignList
    .filter(c => c.status !== 'Draft')
    .slice(0, 5)
    .map(c => ({
      name: c.name.length > 15 ? c.name.substring(0, 15) + '...' : c.name,
      opens: Math.round((c.opens / c.recipients) * 100),
      clicks: Math.round((c.clicks / c.recipients) * 100),
    }));

  const columns = [
    { key: 'name', label: 'Campaign Name' },
    { 
      key: 'type', 
      label: 'Type',
      hidden: 'hidden md:table-cell',
      render: (campaign: Campaign) => (
        <span className={cn(
          "px-2 py-1 rounded text-xs font-medium",
          campaign.type === 'Email' ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
        )}>
          {campaign.type}
        </span>
      ),
    },
    { key: 'sentDate', label: 'Sent Date', hidden: 'hidden lg:table-cell',
      render: (campaign: Campaign) => campaign.sentDate || '-'
    },
    { 
      key: 'recipients', 
      label: 'Recipients',
      hidden: 'hidden sm:table-cell',
      render: (campaign: Campaign) => campaign.recipients.toLocaleString(),
    },
    { 
      key: 'opens', 
      label: 'Opens',
      hidden: 'hidden xl:table-cell',
      render: (campaign: Campaign) => (
        <span>{campaign.opens.toLocaleString()} ({campaign.recipients > 0 ? Math.round((campaign.opens / campaign.recipients) * 100) : 0}%)</span>
      ),
    },
    { 
      key: 'clicks', 
      label: 'Clicks',
      hidden: 'hidden xl:table-cell',
      render: (campaign: Campaign) => (
        <span>{campaign.clicks.toLocaleString()} ({campaign.recipients > 0 ? Math.round((campaign.clicks / campaign.recipients) * 100) : 0}%)</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (campaign: Campaign) => (
        <span className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
          campaign.status === 'Active' && "badge-active",
          campaign.status === 'Completed' && "bg-muted text-muted-foreground border border-border",
          campaign.status === 'Draft' && "bg-amber-100 text-amber-700 border border-amber-200"
        )}>
          {campaign.status}
        </span>
      ),
    },
  ];

  const COLORS = ['hsl(262, 52%, 47%)', 'hsl(262, 52%, 57%)', 'hsl(262, 52%, 67%)', 'hsl(160, 84%, 39%)', 'hsl(160, 84%, 49%)'];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Campaigns"
          value={promoteStats.totalCampaigns.value}
          change={promoteStats.totalCampaigns.change}
          trend="up"
          delay={0}
        />
        <StatCard
          title="Active Campaigns"
          value={promoteStats.activeCampaigns.value}
          change={promoteStats.activeCampaigns.change}
          trend="up"
          delay={100}
        />
        <StatCard
          title="Emails Sent"
          value={promoteStats.emailsSent.value}
          change={promoteStats.emailsSent.change}
          trend="up"
          delay={200}
        />
        <StatCard
          title="Conversion Rate"
          value={promoteStats.conversionRate.value}
          change={promoteStats.conversionRate.change}
          trend="up"
          suffix="%"
          delay={300}
        />
      </div>

      {/* Performance Chart */}
      <div className="bg-card rounded-xl p-6 stat-card-shadow mb-8 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h3 className="text-lg font-semibold mb-6">Campaign Performance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(220, 10%, 46%)"
                fontSize={12}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="hsl(220, 10%, 46%)"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`]}
              />
              <Bar dataKey="opens" name="Open Rate" radius={[4, 4, 0, 0]}>
                {performanceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaigns Table */}
      <DataTable
        title="All Campaigns"
        subtitle="Marketing activities"
        data={campaignList}
        columns={columns}
        searchKeys={['name', 'type']}
        exportFileName="campaigns"
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        }
      />

      <CampaignModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
      />
    </>
  );
};

export default Promote;
