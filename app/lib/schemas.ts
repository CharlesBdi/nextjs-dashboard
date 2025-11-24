// app/lib/schemas.ts
import { z } from 'zod';

// Base schema used for CREATE + UPDATE
export const FormSchema = z.object({
  id: z.string().optional(),
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string().optional(),
});

// Schema for updating invoices (omit id and date)
export const UpdateInvoice = FormSchema.omit({ id: true, date: true });
