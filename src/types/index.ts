export type UserRole = 'customer' | 'videographer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  createdAt: string;
  status: ProjectStatus;
  scriptCompleted: boolean;
  assetsCount: number;
  storageUsed: number; // in GB
  transferRate: number; // in GB
  customerId: string;
  videographerId?: string;
}

export type ProjectStatus = 
  | 'draft'
  | 'submitted'
  | 'estimating'
  | 'approved'
  | 'in_progress'
  | 'review'
  | 'revision'
  | 'complete';

export interface Asset {
  id: string;
  name: string;
  type: string;
  size: number; // in bytes
  url: string;
  uploadDate: string;
  source: 'customer' | 'north_bound';
  projectId: string;
}

export interface Invoice {
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  projectId: string;
  customerId: string;
}

export interface Payout {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid';
  datePaid?: string;
  projectId: string;
  videographerId: string;
}