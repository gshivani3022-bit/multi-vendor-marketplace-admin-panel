const navGroups = [
  {
    label: "Overview",
    items: [
      { key: "dashboard", icon: "DB", label: "Dashboard" },
      { key: "orders", icon: "OR", label: "Orders", badge: "12" }
    ]
  },
  {
    label: "Management",
    items: [
      { key: "vendors", icon: "VE", label: "Vendors" },
      { key: "products", icon: "PR", label: "Products" },
      { key: "customers", icon: "CU", label: "Customers" }
    ]
  },
  {
    label: "System",
    items: [
      { key: "approvals", icon: "AP", label: "Approvals", dynamicBadge: true },
      { key: "settings", icon: "ST", label: "Settings" }
    ]
  }
];

export default function Sidebar({ page, setPage, pendingCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">M</div>
        <div>
          <div className="logo-text">MarketHub</div>
          <div className="logo-sub">Admin Panel</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div key={group.label} className="nav-group">
            <div className="nav-label">{group.label}</div>
            {group.items.map((item) => (
              <button
                key={item.key}
                className={`nav-item ${page === item.key ? "active" : ""}`}
                onClick={() => setPage(item.key)}
                type="button"
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {(item.badge || item.dynamicBadge) && (
                  <span className="nav-badge">{item.dynamicBadge ? pendingCount : item.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">AD</div>
        <div>
          <div className="avatar-name">Admin User</div>
          <div className="avatar-role">Super Admin</div>
        </div>
      </div>
    </aside>
  );
}
