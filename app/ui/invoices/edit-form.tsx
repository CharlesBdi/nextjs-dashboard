"use client";

import { CustomerField, InvoiceForm } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateInvoice } from "@/app/lib/actions";

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm | null;
  customers: CustomerField[];
}) {

  if (!invoice) {
    return <p className="text-red-500">Invoice not found.</p>;
  }

  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  return (
    <form action={updateInvoiceWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue={invoice.customer_id}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            defaultValue={invoice.amount}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-[78px] h-[18px] w-[18px] text-gray-500" />
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  defaultChecked={invoice.status === "pending"}
                  className="mr-2 h-4 w-4"
                />
                Pending <ClockIcon className="ml-1 h-4 w-4" />
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="paid"
                  defaultChecked={invoice.status === "paid"}
                  className="mr-2 h-4 w-4"
                />
                Paid <CheckIcon className="ml-1 h-4 w-4" />
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
