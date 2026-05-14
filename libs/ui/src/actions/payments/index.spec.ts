import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createPayment,
  deletePayment,
  getPayments,
  updatePayment,
  updatePaymentStatus,
} from './index';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

function createFormData(entries: Record<string, string>): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value);
  }

  return formData;
}

describe('payments actions', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    process.env.API_URL = 'https://api.example.test';
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it('returns payments from the API', async () => {
    const payments = [
      {
        id: 'payment-1',
        amount: 150,
        currency: 'EUR',
        debtorAccount: 'DEBTOR-1',
        creditorAccount: 'CREDITOR-1',
        status: 'CREATED',
        createdAt: '2026-05-14T00:00:00.000Z',
      },
    ];

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(payments), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(getPayments()).resolves.toEqual(payments);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/payments',
    );
  });

  it('returns an empty list when loading payments fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network error'));

    await expect(getPayments()).resolves.toEqual([]);
  });

  it('creates a payment and refreshes the home page', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 'payment-1' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await createPayment(
      { success: true },
      createFormData({
        amount: '150',
        currency: 'EUR',
        debtorAccount: 'DEBTOR-1',
        creditorAccount: 'CREDITOR-1',
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/payments',
      {
        method: 'POST',
        body: JSON.stringify({
          amount: 150,
          currency: 'EUR',
          debtorAccount: 'DEBTOR-1',
          creditorAccount: 'CREDITOR-1',
        }),
      },
    );
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('returns an error when payment creation fails', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await expect(
      createPayment(
        { success: true },
        createFormData({
          amount: '150',
          currency: 'EUR',
          debtorAccount: 'DEBTOR-1',
          creditorAccount: 'CREDITOR-1',
        }),
      ),
    ).resolves.toEqual({
      success: false,
      error: 'Payment creation failed',
    });
  });

  it('updates a payment and refreshes the home page', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 200 }));

    await updatePayment(
      { success: true },
      createFormData({
        id: 'payment-1',
        amount: '250',
        currency: 'USD',
        debtorAccount: 'DEBTOR-2',
        creditorAccount: 'CREDITOR-2',
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/payments/payment-1',
      {
        method: 'PUT',
        body: JSON.stringify({
          amount: 250,
          currency: 'USD',
          debtorAccount: 'DEBTOR-2',
          creditorAccount: 'CREDITOR-2',
        }),
      },
    );
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('returns an error when payment update fails', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }));

    await expect(
      updatePayment(
        { success: true },
        createFormData({
          id: 'payment-1',
          amount: '250',
          currency: 'USD',
          debtorAccount: 'DEBTOR-2',
          creditorAccount: 'CREDITOR-2',
        }),
      ),
    ).resolves.toEqual({
      success: false,
      error: 'Payment creation failed',
    });
  });

  it('updates payment status and refreshes the home page', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 200 }));

    await updatePaymentStatus(
      { success: true },
      createFormData({
        id: 'payment-1',
        mode: 'complete',
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/payments/payment-1/complete',
      {
        method: 'POST',
      },
    );
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('deletes a payment and refreshes the home page', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 200 }));

    await deletePayment(
      { success: true },
      createFormData({
        id: 'payment-1',
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/payments/payment-1',
      {
        method: 'DELETE',
      },
    );
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('returns an internal server error when deleting a payment throws', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network error'));

    await expect(
      deletePayment(
        { success: true },
        createFormData({
          id: 'payment-1',
        }),
      ),
    ).resolves.toEqual({
      success: false,
      error: 'Internal Server Error',
    });
  });
});
