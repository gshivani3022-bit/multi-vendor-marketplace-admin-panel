import { useState } from "react";

function badgeClass(status) {
  if (status === "delivered" || status === "active") return "badge-green";
  if (status === "pending") return "badge-orange";
  return "badge-gray";
}

export default function Dashboard({ orders, revenue, topVendors, vendors, approvals }) {
  const [filter, setFilter] = useState("all");
  const maxRevenue = Math.max(...revenue.map((item) => item.val));
  const recentOrders = filter === "all" ? orders : orders.filter((order) => order.status === filter);

  return (
    <div className="content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">Rs. 14.2L</div>
          <div className="stat-change">Up 12.4% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Vendors</div>
          <div className="stat-value">{vendors.filter((vendor) => vendor.status === "active").length}</div>
          <div className="stat-change">3 new this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">1,204</div>
          <div className="stat-change">Up 8.1% vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Approvals</div>
          <div className="stat-value">{approvals.length}</div>
          <div className="stat-change down">Needs attention</div>
        </div>
      </div>

      <div className="grid-3-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Monthly Revenue</div>
            <span className="badge badge-green">2024-25</span>
          </div>
          <div className="chart-wrap">
            <div className="chart-bars">
              {revenue.map((item) => (
                <div className="bar-group" key={item.month}>
                  <div className="bar" style={{ height: `${Math.round((item.val / maxRevenue) * 130)}px` }}>
                    <div className="bar-tooltip">Rs. {Math.round(item.val / 1000)}K</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-labels">
              {revenue.map((item) => <div className="chart-label" key={item.month}>{item.month}</div>)}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Top Vendors</div>
          </div>
          {topVendors.map((vendor, index) => (
            <div className="vendor-row" key={vendor.name}>
              <div className={`vendor-avatar ${vendor.cls}`}>{vendor.name.slice(0, 2).toUpperCase()}</div>
              <div className="vendor-info">
                <div className="vendor-name">{vendor.name}</div>
                <div className="vendor-cat">{vendor.cat}</div>
                <div className="prog-wrap"><div className="prog-bar" style={{ width: `${95 - index * 18}%` }} /></div>
              </div>
              <div className="vendor-rev">{vendor.revenue}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Orders</div>
          <div className="filter-tabs">
            {["all", "delivered", "pending", "cancelled"].map((item) => (
              <button
                className={`filter-tab ${filter === item ? "active" : ""}`}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Vendor</th><th>Amount</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {recentOrders.slice(0, 5).map((order) => (
              <tr key={order.id}>
                <td className="mono">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.vendor}</td>
                <td><strong>{order.amount}</strong></td>
                <td><span className={`badge ${badgeClass(order.status)}`}>{order.status}</span></td>
                <td className="muted-cell">{order.date}</td>
              </tr>
            ))}
            {!recentOrders.length && (
              <tr><td colSpan="6" className="empty">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
