export default function Approvals({ approvals, approveVendor, rejectVendor, search }) {
  const query = search.trim().toLowerCase();
  const filtered = approvals.filter((approval) =>
    [approval.name, approval.cat, approval.submitted, approval.docs]
      .some((value) => String(value).toLowerCase().includes(query))
  );

  return (
    <div className="content">
      <div className="card">
        <div className="card-header"><div className="card-title">Pending Vendor Approvals</div></div>
        <table>
          <thead>
            <tr><th>Vendor Name</th><th>Category</th><th>Submitted</th><th>Documents</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filtered.map((approval) => (
              <tr key={approval.name}>
                <td><strong>{approval.name}</strong></td>
                <td>{approval.cat}</td>
                <td className="muted-cell">{approval.submitted}</td>
                <td><span className={`badge ${approval.docs === "Complete" ? "badge-green" : "badge-orange"}`}>{approval.docs}</span></td>
                <td className="actions-cell">
                  <button className="action-btn approve" onClick={() => approveVendor(approval.name)}>Approve</button>
                  <button className="action-btn reject" onClick={() => rejectVendor(approval.name)}>Reject</button>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td colSpan="5" className="empty">No pending approvals.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
