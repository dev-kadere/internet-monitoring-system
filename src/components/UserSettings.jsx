import React, { useState, useEffect } from "react";

const UserSettings = ({ clearLogs }) => {
  const [alertEnabled, setAlertEnabled] = useState(false);

  useEffect(() => {
    // Initialize the alert status from localStorage when the component mounts
    setAlertEnabled(localStorage.getItem("alert") === "true");
  }, []);

  const handleAlertToggle = () => {
    const newAlertStatus = !alertEnabled;
    setAlertEnabled(newAlertStatus);
    localStorage.setItem("alert", newAlertStatus);

    const message = newAlertStatus
      ? "Alert enabled for connection status changes."
      : "Alert disabled for connection status changes.";

    alert(message); // Keep this for now
  };

  const handleClearLogs = () => {
    clearLogs(); // Call clearLogs function passed from App
  };

  return (
    <div className="user-settings p-6 mb-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">User Settings</h2>
      <div className="flex flex-col space-y-4">
        <p className="mb-2 text-gray-600">Enable Alerts for Status Changes:</p>
        <div className="flex space-x-4">
          {/* Flex container for buttons with equal height and width */}
          <button
            onClick={handleAlertToggle}
            className={`flex-1 h-12 rounded-lg text-white transition-colors duration-300 ${
              alertEnabled
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {alertEnabled ? "Disable Alerts" : "Enable Alerts"}
          </button>
          <button
            onClick={handleClearLogs}
            className="flex-1 h-12 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-200"
          >
            Clear Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
