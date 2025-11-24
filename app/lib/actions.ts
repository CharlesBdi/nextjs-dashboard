'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FormSchema, UpdateInvoice } from './schemas';

// CREATE
export async function createInvoice(data: {
  customerId: string;
  amount: number | string;
  status: 'pending' | 'paid';
  date: string;
}) {
  const validated = FormSchema.parse({
    customerId: data.customerId,
    amount: Number(data.amount),
    status: data.status,
    date: data.date,
  });

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${validated.customerId}, ${validated.amount}, ${validated.status}, ${validated.date})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// UPDATE
export async function updateInvoice(
  id: string,
  data: { customerId: string; amount: number | string; status: 'pending' | 'paid' }
) {
  const validated = UpdateInvoice.parse({
    customerId: data.customerId,
    amount: Number(data.amount),
    status: data.status,
  });

  await sql`
    UPDATE invoices
    SET customer_id = ${validated.customerId},
        amount = ${validated.amount},
        status = ${validated.status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// DELETE
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
