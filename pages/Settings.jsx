export default function Settings({ showToast }) {
  return (
    <div className="content">
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Platform Settings</div></div>
          <div className="settings-panel">
            <div className="form-group">
              <label className="form-label">Platform Name</label>
              <input className="form-input" defaultValue="MarketHub" />
            </div>
            <div className="form-group">
              <label className="form-label">Commission Rate (%)</label>
              <input className="form-input" type="number" defaultValue="8" />
            </div>
            <div className="form-group">
              <label className="form-label">Support Email</label>
              <input className="form-input" type="email" defaultValue="support@markethub.com" />
            </div>
            <div className="settings-actions">
              <button className="topbar-btn primary" onClick={() => showToast("Settings saved")}>Save Changes</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Notification Preferences</div></div>
          <div className="settings-panel check-list">
            <label><input type="checkbox" defaultChecked /> New vendor registration</label>
            <label><input type="checkbox" defaultChecked /> Order cancellations</label>
            <label><input type="checkbox" /> Weekly revenue report</label>
            <label><input type="checkbox" defaultChecked /> Pending approvals reminder</label>
            <div className="settings-actions">
              <button className="topbar-btn primary" onClick={() => showToast("Preferences saved")}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
