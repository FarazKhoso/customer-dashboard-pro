export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: 'Active' | 'Inactive';
  avatar: string;
  joinedDate: string;
  totalSpent: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
  sku: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'SMS';
  sentDate: string;
  recipients: number;
  opens: number;
  clicks: number;
  status: 'Active' | 'Completed' | 'Draft';
}

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Jane Cooper',
    company: 'Microsoft',
    phone: '(225) 555-0118',
    email: 'jane@microsoft.com',
    country: 'United States',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-01-15',
    totalSpent: 12500,
  },
  {
    id: '2',
    name: 'Floyd Miles',
    company: 'Yahoo',
    phone: '(205) 555-0100',
    email: 'floyd@yahoo.com',
    country: 'Kiribati',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-02-20',
    totalSpent: 8200,
  },
  {
    id: '3',
    name: 'Ronald Richards',
    company: 'Adobe',
    phone: '(302) 555-0107',
    email: 'ronald@adobe.com',
    country: 'Israel',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-03-10',
    totalSpent: 15300,
  },
  {
    id: '4',
    name: 'Marvin McKinney',
    company: 'Tesla',
    phone: '(252) 555-0126',
    email: 'marvin@tesla.com',
    country: 'Iran',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-04-05',
    totalSpent: 22100,
  },
  {
    id: '5',
    name: 'Jerome Bell',
    company: 'Google',
    phone: '(629) 555-0129',
    email: 'jerome@google.com',
    country: 'Réunion',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-05-12',
    totalSpent: 18900,
  },
  {
    id: '6',
    name: 'Kathryn Murphy',
    company: 'Meta',
    phone: '(406) 555-0120',
    email: 'kathryn@meta.com',
    country: 'Curaçao',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-06-18',
    totalSpent: 9800,
  },
  {
    id: '7',
    name: 'Jacob Jones',
    company: 'Amazon',
    phone: '(208) 555-0112',
    email: 'jacob@amazon.com',
    country: 'Brazil',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-07-22',
    totalSpent: 31200,
  },
  {
    id: '8',
    name: 'Kristin Watson',
    company: 'Netflix',
    phone: '(704) 555-0127',
    email: 'kristin@netflix.com',
    country: 'Åland Islands',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-08-30',
    totalSpent: 14600,
  },
  {
    id: '9',
    name: 'Robert Fox',
    company: 'Spotify',
    phone: '(312) 555-0198',
    email: 'robert@spotify.com',
    country: 'Sweden',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-09-14',
    totalSpent: 7800,
  },
  {
    id: '10',
    name: 'Emily Johnson',
    company: 'Apple',
    phone: '(415) 555-0145',
    email: 'emily@apple.com',
    country: 'United States',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    joinedDate: '2023-10-01',
    totalSpent: 45200,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 14"',
    category: 'Electronics',
    price: 1999,
    stock: 45,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
    sku: 'MBP-14-001',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 299,
    stock: 8,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    sku: 'WH-001',
  },
  {
    id: '3',
    name: 'Ergonomic Chair',
    category: 'Furniture',
    price: 599,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=100&h=100&fit=crop',
    sku: 'EC-001',
  },
  {
    id: '4',
    name: 'Standing Desk',
    category: 'Furniture',
    price: 899,
    stock: 23,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=100&h=100&fit=crop',
    sku: 'SD-001',
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 159,
    stock: 67,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop',
    sku: 'MK-001',
  },
  {
    id: '6',
    name: '4K Monitor',
    category: 'Electronics',
    price: 449,
    stock: 5,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop',
    sku: '4KM-001',
  },
  {
    id: '7',
    name: 'USB-C Hub',
    category: 'Accessories',
    price: 79,
    stock: 120,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop',
    sku: 'UCH-001',
  },
  {
    id: '8',
    name: 'Webcam HD',
    category: 'Electronics',
    price: 129,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=100&h=100&fit=crop',
    sku: 'WC-001',
  },
];

export const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    customerId: '1',
    customerName: 'Jane Cooper',
    amount: 2500,
    dueDate: '2024-02-15',
    status: 'Paid',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    customerId: '4',
    customerName: 'Marvin McKinney',
    amount: 4200,
    dueDate: '2024-02-20',
    status: 'Pending',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    customerId: '5',
    customerName: 'Jerome Bell',
    amount: 1800,
    dueDate: '2024-01-10',
    status: 'Overdue',
    createdAt: '2023-12-10',
  },
  {
    id: '4',
    invoiceNumber: 'INV-004',
    customerId: '7',
    customerName: 'Jacob Jones',
    amount: 6500,
    dueDate: '2024-02-28',
    status: 'Paid',
    createdAt: '2024-01-28',
  },
  {
    id: '5',
    invoiceNumber: 'INV-005',
    customerId: '10',
    customerName: 'Emily Johnson',
    amount: 3200,
    dueDate: '2024-03-01',
    status: 'Pending',
    createdAt: '2024-02-01',
  },
  {
    id: '6',
    invoiceNumber: 'INV-006',
    customerId: '6',
    customerName: 'Kathryn Murphy',
    amount: 890,
    dueDate: '2024-01-05',
    status: 'Overdue',
    createdAt: '2023-12-05',
  },
  {
    id: '7',
    invoiceNumber: 'INV-007',
    customerId: '9',
    customerName: 'Robert Fox',
    amount: 1500,
    dueDate: '2024-03-10',
    status: 'Paid',
    createdAt: '2024-02-10',
  },
  {
    id: '8',
    invoiceNumber: 'INV-008',
    customerId: '3',
    customerName: 'Ronald Richards',
    amount: 4800,
    dueDate: '2024-02-25',
    status: 'Pending',
    createdAt: '2024-01-25',
  },
];

export const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    type: 'Email',
    sentDate: '2024-01-15',
    recipients: 15000,
    opens: 8500,
    clicks: 2100,
    status: 'Completed',
  },
  {
    id: '2',
    name: 'New Product Launch',
    type: 'Email',
    sentDate: '2024-02-01',
    recipients: 22000,
    opens: 12000,
    clicks: 4500,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Flash Sale Alert',
    type: 'SMS',
    sentDate: '2024-02-05',
    recipients: 8000,
    opens: 7200,
    clicks: 1800,
    status: 'Completed',
  },
  {
    id: '4',
    name: 'Valentine Special',
    type: 'Email',
    sentDate: '2024-02-14',
    recipients: 18000,
    opens: 9800,
    clicks: 3200,
    status: 'Active',
  },
  {
    id: '5',
    name: 'Customer Feedback',
    type: 'Email',
    sentDate: '',
    recipients: 0,
    opens: 0,
    clicks: 0,
    status: 'Draft',
  },
  {
    id: '6',
    name: 'Weekend Deals',
    type: 'SMS',
    sentDate: '2024-01-28',
    recipients: 5000,
    opens: 4200,
    clicks: 980,
    status: 'Completed',
  },
];

export const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 55000 },
  { month: 'Apr', revenue: 48000 },
  { month: 'May', revenue: 62000 },
  { month: 'Jun', revenue: 58000 },
  { month: 'Jul', revenue: 71000 },
  { month: 'Aug', revenue: 65000 },
  { month: 'Sep', revenue: 78000 },
  { month: 'Oct', revenue: 82000 },
  { month: 'Nov', revenue: 75000 },
  { month: 'Dec', revenue: 95000 },
];

export const campaignPerformance = [
  { name: 'Email', value: 65 },
  { name: 'SMS', value: 35 },
];

export const stats = {
  totalCustomers: { value: 5423, change: 16, trend: 'up' as const },
  members: { value: 1893, change: -1, trend: 'down' as const },
  activeNow: { value: 189, avatars: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=40&h=40&fit=crop&crop=face',
  ]},
};

export const productStats = {
  totalProducts: { value: 1245, change: 12 },
  inStock: { value: 892, change: 8 },
  lowStock: { value: 186, change: -3 },
  outOfStock: { value: 167, change: -5 },
};

export const incomeStats = {
  totalRevenue: { value: 769000, change: 18 },
  thisMonth: { value: 95000, change: 12 },
  pendingInvoices: { value: 12400, change: -4 },
  overdueInvoices: { value: 2690, change: -8 },
};

export const promoteStats = {
  totalCampaigns: { value: 24, change: 15 },
  activeCampaigns: { value: 8, change: 20 },
  emailsSent: { value: 125000, change: 32 },
  conversionRate: { value: 4.2, change: 8, suffix: '%' },
};
