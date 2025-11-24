import { createInvoice } from "@/app/lib/actions";

export default function CreateForm({ customers }) {
  return (
    <form action={createInvoice} className="space-y-4">
      {/* Customer */}
      <label>
        Customer
        <select name="customerId" required>
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {/* Amount */}
      <label>
        Amount
        <input name="amount" type="number" step="0.01" required />
      </label>

      {/* Status */}
      <label>
        Status
        <select name="status" required>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </label>

      {/* Date */}
      <label>
        Date
        <input name="date" type="date" required />
      </label>

      <button type="submit">Create Invoice</button>
    </form>
  );
}
