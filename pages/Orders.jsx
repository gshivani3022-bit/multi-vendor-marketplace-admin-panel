import { useState } from "react";

function badgeClass(status) {
  if (status === "delivered") return "badge-green";
  if (status === "pending") return "badge-orange";
  return "badge-gray";
}

export default function Orders({ orders, cycleOrder, search }) {
  const [filter, setFilter] = useState("all");
  const query = search.trim().toLowerCase();
  const filtered = (filter === "all" ? orders : orders.filter((order) => order.status === filter))
    .filter((order) =>
      [order.id, order.customer, order.vendor, order.amount, order.date]
        .some((value) => String(value).toLowerCase().includes(query))
    );

  return (
    <div className="content">
      <div className="card">
        <div className="card-header">
          <div className="card-title">All Orders</div>
          <div className="orders-filter">
            <select className="filter-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Vendor</th><th>Items</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id}>
                <td className="mono">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.vendor}</td>
                <td>{order.items}</td>
                <td><strong>{order.amount}</strong></td>
                <td><span className={`badge ${badgeClass(order.status)}`}>{order.status}</span></td>
                <td className="muted-cell">{order.date}</td>
                <td><button className="action-btn" onClick={() => cycleOrder(order.id)}>Update</button></td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td colSpan="8" className="empty">No matching orders.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
