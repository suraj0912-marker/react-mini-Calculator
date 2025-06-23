import React from "react";

function Display({ value }) {
  return (
    <input
      type="text"
      className="form-control text-end fs-4 mb-3 p-3 rounded-3 border-secondary"
      value={value}
      readOnly
      placeholder="0"
      // A human might omit explicit aria-live/atomic for simplicity unless a specific issue is reported.
    />
  );
}

export default Display;