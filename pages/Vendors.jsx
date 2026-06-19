export default function Vendors({ vendors, openModal, search, toggleVendorStatus }) {
  const query = search.trim().toLowerCase();
  const filtered = vendors.filter((vendor) =>
    [vendor.name, vendor.cat, vendor.revenue, vendor.status]
      .some((value) => String(value).toLowerCase().includes(query))
  );

  return (
    <div className="content">
      <div className="card">
        <div className="card-header">
          <div className="card-title">All Vendors</div>
          <button className="topbar-btn primary" onClick={openModal}>+ Add Vendor</button>
        </div>
        <table>
          <thead>
            <tr><th>Vendor</th><th>Category</th><th>Products</th><th>Revenue</th><th>Rating</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filtered.map((vendor) => (
              <tr key={vendor.name}>
                <td>
                  <div className="vendor-cell">
                    <div className={`vendor-avatar ${vendor.cls}`}>{vendor.name.slice(0, 2).toUpperCase()}</div>
                    {vendor.name}
                  </div>
                </td>
                <td>{vendor.cat}</td>
                <td>{vendor.products}</td>
                <td><strong>{vendor.revenue}</strong></td>
                <td>{vendor.rating}</td>
                <td><span className={`badge ${vendor.status === "active" ? "badge-green" : "badge-orange"}`}>{vendor.status}</span></td>
                <td>
                  <button className="action-btn" onClick={() => toggleVendorStatus(vendor.name)}>
                    {vendor.status === "active" ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td colSpan="7" className="empty">No matching vendors.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
