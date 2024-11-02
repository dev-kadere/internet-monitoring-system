import React from "react";

function ClearLogs() {
  const handleClearLogs = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all logs?"
    );
    if (confirmClear) {
      localStorage.clear();
      alert("All logs have been cleared.");
    }
  };

  return (
    <button
      onClick={handleClearLogs}
      className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition duration-200"
    >
      Clear Logs
    </button>
  );
}

export default ClearLogs;
