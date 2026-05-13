import type { Payment, Statuses } from '@types';
import { STATUSES } from '@types';

export function createPayment(overrides?: Partial<Payment>): Payment {
  const id = Math.random().toString(36).substr(2, 9);

  return {
    id: `PAY-${id}`,
    amount: Math.random() * 10000,
    currency: 'EUR',
    debtorAccount: 'DE89370400440532013000',
    creditorAccount: 'GB82WEST12345698765432',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

// Create N payments with cycling statuses
export function createPayments(count: number): Payment[] {
  return Array.from({ length: count }, (_, i) =>
    createPayment({
      id: `PAY-${String(i + 1).padStart(3, '0')}`,
      status: STATUSES[i % STATUSES.length],
    }),
  );
}

// Create payments with specific statuses
export function createPaymentsByStatus(statuses: Statuses[]): Payment[] {
  return statuses.map((status, i) =>
    createPayment({
      id: `PAY-${String(i + 1).padStart(3, '0')}`,
      status,
    }),
  );
}

// Pre-built sets for common scenarios
export const mockPayments = {
  empty: [],
  single: [createPayment({ id: 'PAY-001' })],
  mixed: createPaymentsByStatus(['COMPLETED', 'CREATED', 'FAILED']),
  allCompleted: createPayments(5).map((p) => ({
    ...p,
    status: 'COMPLETED' as const,
  })),
  allFailed: createPayments(5).map((p) => ({
    ...p,
    status: 'FAILED' as const,
  })),
};
