'use server';

import type { Payment, StandardResponse } from '@types';
import { revalidatePath } from 'next/cache';

export async function createPayment(
  _: StandardResponse,
  formData: FormData,
): Promise<StandardResponse> {
  try {
    const rawBody: Partial<Payment> = {
      amount: Number(formData.get('amount')),
      currency: String(formData.get('currency')),
      debtorAccount: String(formData.get('debtorAccount')),
      creditorAccount: String(formData.get('creditorAccount')),
    };

    const response = await fetch(`${process.env.API_URL}/payments`, {
      method: 'POST',
      body: JSON.stringify(rawBody),
    });

    const { id } = await response.json();

    if (id) {
      revalidatePath('/');

      return { success: true };
    } else {
      return { success: false, error: 'Payment creation failed' };
    }
  } catch {
    return { success: false, error: 'Internal Server Error' };
  }
}

export async function updatePayment(
  _: StandardResponse,
  formData: FormData,
): Promise<StandardResponse> {
  try {
    const id = String(formData.get('id'));
    const rawBody: Partial<Payment> = {
      amount: Number(formData.get('amount')),
      currency: String(formData.get('currency')),
      debtorAccount: String(formData.get('debtorAccount')),
      creditorAccount: String(formData.get('creditorAccount')),
    };

    const { ok } = await fetch(`${process.env.API_URL}/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(rawBody),
    });

    if (ok) {
      revalidatePath('/');

      return { success: true };
    } else {
      return { success: false, error: 'Payment creation failed' };
    }
  } catch {
    return { success: false, error: 'Internal Server Error' };
  }
}

export async function updatePaymentStatus(
  _: StandardResponse,
  formData: FormData,
): Promise<StandardResponse> {
  try {
    const id = String(formData.get('id'));
    const mode = String(formData.get('mode'));

    const { ok } = await fetch(
      `${process.env.API_URL}/payments/${id}/${mode}`,
      {
        method: 'POST',
      },
    );

    if (ok) {
      revalidatePath('/');

      return { success: true };
    } else {
      return { success: false, error: 'Payment creation failed' };
    }
  } catch {
    return { success: false, error: 'Internal Server Error' };
  }
}

export async function deletePayment(
  _: StandardResponse,
  formData: FormData,
): Promise<StandardResponse> {
  try {
    const id = String(formData.get('id'));

    const { ok } = await fetch(`${process.env.API_URL}/payments/${id}`, {
      method: 'DELETE',
    });

    if (ok) {
      revalidatePath('/');

      return { success: true };
    } else {
      return { success: false, error: 'Payment creation failed' };
    }
  } catch {
    return { success: false, error: 'Internal Server Error' };
  }
}
