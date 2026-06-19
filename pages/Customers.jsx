export default function Customers({ customers, search }) {
  const query = search.trim().toLowerCase();
  const filtered = customers.filter((customer) =>
    [customer.name, customer.email, customer.spent, customer.joined, customer.status]
      .some((value) => String(value).toLowerCase().includes(query))
  );

  return (
    <div className="content">
      <div className="card">
        <div className="card-header"><div className="card-title">All Customers</div></div>
        <table>
          <thead>
            <tr><th>Customer</th><th>Email</th><th>Orders</th><th>Spent</th><th>Joined</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr key={customer.email}>
                <td><strong>{customer.name}</strong></td>
                <td className="muted-cell">{customer.email}</td>
                <td>{customer.orders}</td>
                <td><strong>{customer.spent}</strong></td>
                <td className="muted-cell">{customer.joined}</td>
                <td><span className={`badge ${customer.status === "active" ? "badge-green" : "badge-gray"}`}>{customer.status}</span></td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td colSpan="6" className="empty">No matching customers.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
