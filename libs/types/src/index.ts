export const STATUSES = ['CREATED', 'FAILED', 'COMPLETED'] as const;
export type Statuses = (typeof STATUSES)[number];

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  debtorAccount: string;
  creditorAccount: string;
  status: Statuses;
  createdAt: string;
}
