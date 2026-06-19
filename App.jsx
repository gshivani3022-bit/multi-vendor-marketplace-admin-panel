import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Vendors from "./pages/Vendors";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Approvals from "./pages/Approvals";
import Settings from "./pages/Settings";
import {
  approvalsData,
  customersData,
  ordersData,
  productsData,
  revenueData,
  vendorsData
} from "./data/mockData";

const titles = {
  dashboard: "Dashboard",
  orders: "Orders",
  vendors: "Vendors",
  products: "Products",
  customers: "Customers",
  approvals: "Approvals",
  settings: "Settings"
};

function App() {
  const savedState = JSON.parse(localStorage.getItem("markethub-state") || "null");
  const [page, setPage] = useState("dashboard");
  const [orders, setOrders] = useState(savedState?.orders || ordersData);
  const [vendors, setVendors] = useState(savedState?.vendors || vendorsData);
  const [approvals, setApprovals] = useState(savedState?.approvals || approvalsData);
  const [products, setProducts] = useState(savedState?.products || productsData);
  const [toast, setToast] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [activity, setActivity] = useState(savedState?.activity || [
    "Dashboard loaded",
    "Pending vendor queue ready",
    "Inventory synced"
  ]);

  const pendingCount = approvals.length;
  const currentTitle = titles[page] || "Dashboard";

  const topVendors = useMemo(() => vendors.slice(0, 4), [vendors]);

  useEffect(() => {
    localStorage.setItem(
      "markethub-state",
      JSON.stringify({ orders, vendors, approvals, products, activity })
    );
  }, [orders, vendors, approvals, products, activity]);

  function showToast(message) {
    setToast(message);
    setActivity((items) => [message, ...items].slice(0, 8));
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2600);
  }

  function approveVendor(name) {
    const approved = approvals.find((item) => item.name === name);
    setApprovals((items) => items.filter((item) => item.name !== name));
    if (approved) {
      setVendors((items) => [
        ...items,
        {
          name: approved.name,
          cat: approved.cat,
          products: 0,
          revenue: "Rs. 0",
          rating: "New",
          status: "active",
          cls: "va-5"
        }
      ]);
    }
    showToast(`${name} has been approved`);
  }

  function rejectVendor(name) {
    setApprovals((items) => items.filter((item) => item.name !== name));
    showToast(`${name} was rejected`);
  }

  function submitVendor(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("business").trim() || "New Vendor";
    const cat = form.get("category");
    setApprovals((items) => [
      ...items,
      { name, cat, submitted: "Today", docs: "Complete" }
    ]);
    setModalOpen(false);
    showToast("Vendor submitted for approval");
  }

  function cycleOrder(id) {
    const next = { delivered: "pending", pending: "cancelled", cancelled: "delivered" };
    setOrders((items) =>
      items.map((order) =>
        order.id === id ? { ...order, status: next[order.status] || "pending" } : order
      )
    );
    showToast(`${id} status updated`);
  }

  function toggleVendorStatus(name) {
    setVendors((items) =>
      items.map((vendor) =>
        vendor.name === name
          ? { ...vendor, status: vendor.status === "active" ? "suspended" : "active" }
          : vendor
      )
    );
    showToast(`${name} status changed`);
  }

  function addProduct(product) {
    setProducts((items) => [{ ...product, id: crypto.randomUUID() }, ...items]);
    showToast(`${product.name} added to inventory`);
  }

  function changeStock(name, amount) {
    setProducts((items) =>
      items.map((product) => {
        if (product.name !== name) return product;
        const currentStock = Number(product.quantity || 0);
        const nextStock = Math.max(0, currentStock + amount);
        return {
          ...product,
          quantity: nextStock,
          stock: nextStock === 0 ? "Out of Stock" : nextStock < 10 ? "Low Stock" : "In Stock"
        };
      })
    );
    showToast(amount > 0 ? `${name} restocked` : `${name} stock updated`);
  }

  function resetDemo() {
    setOrders(ordersData);
    setVendors(vendorsData);
    setApprovals(approvalsData);
    setProducts(productsData);
    setActivity(["Demo data reset"]);
    showToast("Demo data reset");
  }

  const commonProps = {
    approvals,
    approveVendor,
    activity,
    addProduct,
    changeStock,
    customers: customersData,
    cycleOrder,
    orders,
    products,
    rejectVendor,
    revenue: revenueData,
    search,
    showToast,
    toggleVendorStatus,
    topVendors,
    vendors
  };

  const renderPage = () => {
    switch (page) {
      case "orders":
        return <Orders {...commonProps} />;
      case "vendors":
        return <Vendors {...commonProps} openModal={() => setModalOpen(true)} />;
      case "products":
        return <Products {...commonProps} />;
      case "customers":
        return <Customers {...commonProps} />;
      case "approvals":
        return <Approvals {...commonProps} />;
      case "settings":
        return <Settings showToast={showToast} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <>
      <Sidebar page={page} setPage={setPage} pendingCount={pendingCount} />

      <main className="main">
        <header className="topbar">
          <div className="topbar-title">{currentTitle}</div>
          <div className="search-wrap">
            <span className="search-icon">Search</span>
            <input
              className="topbar-search"
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button className="search-clear" type="button" onClick={() => setSearch("")}>
                Clear
              </button>
            )}
          </div>
          <button className="topbar-btn" onClick={() => showToast("No new notifications")}>Alerts</button>
          <button className="topbar-btn" onClick={() => setAlertsOpen((open) => !open)}>Activity</button>
          <button className="topbar-btn primary" onClick={() => setModalOpen(true)}>+ Add Vendor</button>
        </header>

        {alertsOpen && (
          <section className="activity-strip">
            <div>
              <strong>Recent activity</strong>
              <span>Live actions from this admin session</span>
            </div>
            <div className="activity-list">
              {activity.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
            </div>
            <button className="action-btn" onClick={resetDemo}>Reset Demo</button>
          </section>
        )}

        {renderPage()}
      </main>

      {modalOpen && (
        <div className="modal-overlay open" onMouseDown={() => setModalOpen(false)}>
          <form className="modal" onSubmit={submitVendor} onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setModalOpen(false)}>x</button>
            <div className="modal-title">Add New Vendor</div>
            <div className="modal-sub">Fill in the details to register a vendor.</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Business Name</label>
                <input className="form-input" name="business" placeholder="e.g. TechZone Store" required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" name="category">
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Food</option>
                  <option>Books</option>
                  <option>Home & Garden</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Owner Name</label>
              <input className="form-input" name="owner" placeholder="Full name" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" name="email" placeholder="vendor@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" type="tel" name="phone" placeholder="+91 ..." />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">GSTIN (optional)</label>
              <input className="form-input" name="gstin" placeholder="22AAAAA0000A1Z5" />
            </div>
            <div className="modal-actions">
              <button className="topbar-btn" type="button" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="topbar-btn primary" type="submit">Add Vendor</button>
            </div>
          </form>
        </div>
      )}

      <div className={`notif ${toast ? "show" : ""}`} role="alert">{toast}</div>
    </>
  );
}

export default App;
