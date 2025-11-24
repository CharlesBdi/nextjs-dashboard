import postgres from 'postgres';

// Initialize the postgres client. It's crucial to use the non-null assertion
// operator (!) here as the environment variable is expected to be present.
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Fetches a list of invoices with a specific amount and joins with customer names.
 * @returns {Promise<any[]>} The list of invoices.
 */
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return data;
}

/**
 * Handles GET requests for the route.
 * @returns {Response} A JSON response containing the invoices or an error message.
 */
export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (error) {
    // TypeScript Error Fix: The caught 'error' is of type 'unknown'.
    // We must use a type guard (instanceof Error) to safely access 'error.message'.
    const errorMessage = error instanceof Error
      ? error.message
      : 'An unexpected database error occurred.';

    console.error('Database query failed:', error);

    return Response.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}