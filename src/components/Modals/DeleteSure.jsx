import React from "react";

export default function DeleteSure({
  open,
  onConfirm,
  onCancel,
  loading,
  isDimiss,
}) {
  if (!open) return null;

  return (
    <div className="ds-overlay">
      <div className="ds-modal">
        <h2 className="ds-title">Are you sure?</h2>
        <p className="ds-text">This action cannot be undone.</p>

        <div className="ds-buttons">
          <button className="ds-btn ds-cancel" onClick={onCancel}>
            Cancel
          </button>
          {isDimiss ? (
            <button className="ds-btn ds-delete" onClick={onConfirm}>
              {loading ? "Dismissing..." : "Dismiss"}
            </button>
          ) : (
            <button className="ds-btn ds-delete" onClick={onConfirm}>
              {loading ? "Deleting..." : "Delete"}
            </button>
          )}
         
        </div>
      </div>
    </div>
  );
}
