export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  city: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
}

export const mockOrders: Order[] = [
  { id: 'ORD-001', customer: 'Ahmed Benali', email: 'ahmed@mail.com', phone: '0612345678', city: 'Casablanca', items: 3, total: 165500, status: 'delivered', date: '2026-02-18' },
  { id: 'ORD-002', customer: 'Fatima Zahra', email: 'fatima@mail.com', phone: '0698765432', city: 'Rabat', items: 1, total: 198000, status: 'shipped', date: '2026-02-19' },
  { id: 'ORD-003', customer: 'Youssef Amrani', email: 'youssef@mail.com', phone: '0654321876', city: 'Marrakech', items: 2, total: 25700, status: 'processing', date: '2026-02-20' },
  { id: 'ORD-004', customer: 'Sara Idrissi', email: 'sara@mail.com', phone: '0667891234', city: 'Fès', items: 1, total: 8500, status: 'pending', date: '2026-02-21' },
  { id: 'ORD-005', customer: 'Mohamed Tazi', email: 'mohamed@mail.com', phone: '0645678912', city: 'Tanger', items: 4, total: 34200, status: 'delivered', date: '2026-02-16' },
  { id: 'ORD-006', customer: 'Nadia Kouiri', email: 'nadia@mail.com', phone: '0623456789', city: 'Agadir', items: 2, total: 153500, status: 'cancelled', date: '2026-02-15' },
  { id: 'ORD-007', customer: 'Karim Alaoui', email: 'karim@mail.com', phone: '0678912345', city: 'Oujda', items: 1, total: 18500, status: 'delivered', date: '2026-02-14' },
  { id: 'ORD-008', customer: 'Imane Fassi', email: 'imane@mail.com', phone: '0689123456', city: 'Kenitra', items: 3, total: 21300, status: 'shipped', date: '2026-02-20' },
];

export const mockCustomers: Customer[] = [
  { id: 'C-001', name: 'Ahmed Benali', email: 'ahmed@mail.com', phone: '0612345678', city: 'Casablanca', orders: 8, totalSpent: 523000, lastOrder: '2026-02-18' },
  { id: 'C-002', name: 'Fatima Zahra', email: 'fatima@mail.com', phone: '0698765432', city: 'Rabat', orders: 3, totalSpent: 298000, lastOrder: '2026-02-19' },
  { id: 'C-003', name: 'Youssef Amrani', email: 'youssef@mail.com', phone: '0654321876', city: 'Marrakech', orders: 5, totalSpent: 187500, lastOrder: '2026-02-20' },
  { id: 'C-004', name: 'Sara Idrissi', email: 'sara@mail.com', phone: '0667891234', city: 'Fès', orders: 2, totalSpent: 45000, lastOrder: '2026-02-21' },
  { id: 'C-005', name: 'Mohamed Tazi', email: 'mohamed@mail.com', phone: '0645678912', city: 'Tanger', orders: 12, totalSpent: 892000, lastOrder: '2026-02-16' },
  { id: 'C-006', name: 'Nadia Kouiri', email: 'nadia@mail.com', phone: '0623456789', city: 'Agadir', orders: 1, totalSpent: 153500, lastOrder: '2026-02-15' },
  { id: 'C-007', name: 'Karim Alaoui', email: 'karim@mail.com', phone: '0678912345', city: 'Oujda', orders: 6, totalSpent: 342000, lastOrder: '2026-02-14' },
];

export const revenueData = [
  { month: 'Sep', revenue: 285000, orders: 32 },
  { month: 'Oct', revenue: 340000, orders: 41 },
  { month: 'Nov', revenue: 412000, orders: 53 },
  { month: 'Dec', revenue: 520000, orders: 67 },
  { month: 'Jan', revenue: 395000, orders: 48 },
  { month: 'Feb', revenue: 478000, orders: 58 },
];

export const categoryBreakdown = [
  { name: 'Laptops', value: 42, fill: 'hsl(213, 94%, 48%)' },
  { name: 'SSD', value: 18, fill: 'hsl(190, 80%, 45%)' },
  { name: 'RAM', value: 14, fill: 'hsl(152, 60%, 42%)' },
  { name: 'Screens', value: 12, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Other', value: 14, fill: 'hsl(215, 15%, 70%)' },
];
