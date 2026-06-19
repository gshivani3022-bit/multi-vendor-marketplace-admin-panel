import { useState } from "react";

export default function Products({ changeStock, products, search }) {
  const [category, setCategory] = useState("all");
  const query = search.trim().toLowerCase();
  const filtered = (category === "all" ? products : products.filter((product) => product.cat === category))
    .filter((product) =>
      [product.name, product.vendor, product.cat, product.stock, product.price]
        .some((value) => String(value).toLowerCase().includes(query))
    );

  return (
    <div className="content">
      <div className="card-header page-card-header">
        <div className="card-title">All Products</div>
        <select className="filter-select" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Food">Food</option>
          <option value="Books">Books</option>
        </select>
      </div>

      <div className="products-grid">
        {filtered.map((product) => (
          <div className="product-card" key={product.name}>
            <div className="product-thumb">{product.icon}</div>
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-vendor">{product.vendor}</div>
              <div className="product-footer">
                <span className="product-price">{product.price}</span>
                <span className={`badge product-stock ${product.stock === "In Stock" ? "badge-green" : product.stock === "Low Stock" ? "badge-orange" : "badge-gray"}`}>{product.stock}</span>
              </div>
              <div className="product-qty">Qty: {product.quantity ?? 0}</div>
              <div className="stock-actions">
                <button className="action-btn" type="button" onClick={() => changeStock(product.name, -1)}>- Stock</button>
                <button className="action-btn approve" type="button" onClick={() => changeStock(product.name, 5)}>+ Stock</button>
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && (
          <div className="empty product-empty">No matching products.</div>
        )}
      </div>
    </div>
  );
}
