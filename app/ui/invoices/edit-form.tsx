'use client';

import { updateInvoice } from '@/app/lib/actions';
import { Invoice, CustomerField } from '@/app/lib/types';

type EditInvoiceFormProps = {
  invoice: Invoice;
  customers: CustomerField[];
};

export default function EditInvoiceForm({ invoice, customers }: EditInvoiceFormProps) {
  return (
    <form
      action={async (formData: FormData) => {
        // Convert FormData to a plain object
        const data = Object.fromEntries(formData) as {
          customerId: string;
          amount: string;
          status: 'pending' | 'paid';
        };

        await updateInvoice(invoice.id, data);
      }}
      className="space-y-4"
    >
      <div>
        <label>Customer</label>
        <select name="customerId" defaultValue={invoice.customerId} required>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          defaultValue={invoice.amount}
          step="0.01"
          required
        />
      </div>

      <div>
        <label>Status</label>
        <select name="status" defaultValue={invoice.status} required>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <button type="submit" className="btn">
        Update Invoice
      </button>
    </form>
  );
}
