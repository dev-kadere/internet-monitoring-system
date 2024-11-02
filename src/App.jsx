import React, { useState } from "react";
import StatusPanel from "./components/StatusPanel";
import GeneralStats from "./components/GeneralStats";
//import DisconnectionGraph from "./components/DisconnectionGraph";
import LogTable from "./components/LogTable";
import ExportOptions from "./components/ExportOptions";
import UserSettings from "./components/UserSettings";
import Footer from "./components/Footer";

function App() {
  const [logs, setLogs] = useState(
    JSON.parse(localStorage.getItem("connectionLogs") || "[]")
  );

  const handleLogUpdate = (updatedLogs) => {
    setLogs(updatedLogs); // Update the logs state
    localStorage.setItem("connectionLogs", JSON.stringify(updatedLogs)); // Save to localStorage
  };

  const clearLogs = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all logs?"
    );
    if (confirmClear) {
      localStorage.removeItem("connectionLogs"); // Clear the logs in localStorage
      setLogs([]); // Update the state to reflect the cleared logs
      alert("All logs have been cleared.");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Internet Monitoring Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* User Settings */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
          <UserSettings clearLogs={clearLogs} />
        </div>

        {/* Connection Status Panel */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
          <StatusPanel onLogUpdate={handleLogUpdate} />
        </div>

        {/* General Stats */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
          <GeneralStats logs={logs} />
        </div>

        {/* Disconnection Graph 
        <div className="lg:col-span-3">
          <DisconnectionGraph logs={logs} />
        </div>
        */}
        {/* Export Options*/}
        <div className="md:col-span-1 lg:col-span-3 bg-white">
          <ExportOptions logs={logs} />
        </div>

        {/* Log Table */}
        <div className="md:col-span-2 lg:col-span-3 bg-white">
          <LogTable logs={logs} />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
