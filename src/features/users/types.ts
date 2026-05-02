export type UserRole = 'Admin' | 'Editor' | 'Viewer';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export type LinkedEntity = {
  entity: string;
  linkedEmail: string;
  usageQueries: number;
  lastActiveInEntity: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedDate: string;
  lastActive: string;
  subscription: UserStatus;
  transactions: number;
  linkedEntities: LinkedEntity[];
};
