import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Building, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { customers } from '@/data/mockData';
import { cn } from '@/lib/utils';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Customer Not Found</h2>
        <Button onClick={() => navigate('/customers')}>Back to Customers</Button>
      </div>
    );
  }

  const activities = [
    { date: '2024-02-15', action: 'Made a purchase', amount: '$1,250' },
    { date: '2024-02-10', action: 'Updated contact info', amount: null },
    { date: '2024-01-28', action: 'Submitted support ticket', amount: null },
    { date: '2024-01-15', action: 'Made a purchase', amount: '$890' },
  ];

  const notes = [
    { date: '2024-02-12', author: 'Evano', content: 'Customer requested priority support.' },
    { date: '2024-01-20', author: 'Sarah', content: 'Follow up on renewal next month.' },
  ];

  const tasks = [
    { title: 'Send renewal quote', dueDate: '2024-03-01', status: 'pending' },
    { title: 'Schedule quarterly review', dueDate: '2024-03-15', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/customers')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Customer Details</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-xl p-6 stat-card-shadow animate-fade-up">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20"
          />
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{customer.name}</h2>
                <p className="text-muted-foreground">{customer.company}</p>
              </div>
              <span className={cn(
                "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium self-start",
                customer.status === 'Active' ? "badge-active" : "badge-inactive"
              )}>
                {customer.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{customer.country}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Joined {customer.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-xl font-bold text-foreground">${customer.totalSpent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Orders</p>
            <p className="text-xl font-bold text-foreground">24</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
            <p className="text-xl font-bold text-foreground">${Math.round(customer.totalSpent / 24).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Loyalty Points</p>
            <p className="text-xl font-bold text-foreground">{Math.round(customer.totalSpent * 0.1).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 stat-card-shadow">
              <h3 className="font-semibold mb-4">Company Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Company:</span>
                  <span className="font-medium">{customer.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Annual Value:</span>
                  <span className="font-medium">${(customer.totalSpent * 4).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 stat-card-shadow">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {activities.slice(0, 3).map((activity, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{activity.action}</span>
                    <span className="font-medium">{activity.amount || activity.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="bg-card rounded-xl p-6 stat-card-shadow">
            <h3 className="font-semibold mb-4">Activity History</h3>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  {activity.amount && (
                    <span className="font-semibold text-success">{activity.amount}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <div className="bg-card rounded-xl p-6 stat-card-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Notes</h3>
              <Button size="sm">Add Note</Button>
            </div>
            <div className="space-y-4">
              {notes.map((note, i) => (
                <div key={i} className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{note.author}</span>
                    <span className="text-sm text-muted-foreground">{note.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <div className="bg-card rounded-xl p-6 stat-card-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Tasks</h3>
              <Button size="sm">Add Task</Button>
            </div>
            <div className="space-y-4">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    task.status === 'completed' ? "badge-active" : "bg-amber-100 text-amber-700"
                  )}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetail;
