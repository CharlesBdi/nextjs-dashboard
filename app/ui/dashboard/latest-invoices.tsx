import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="col-span-4 rounded-xl bg-white p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Latest Invoices</h2>

      <ul className="space-y-4">
        {latestInvoices.map((invoice) => (
          <li key={invoice.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{invoice.name}</p>
              <p className="text-sm text-gray-500">{invoice.email}</p>
            </div>
            <span className="font-semibold">${invoice.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
