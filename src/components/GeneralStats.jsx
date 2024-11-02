import React, { useEffect, useState } from "react";

function GeneralStats({ logs }) {
  const [availability, setAvailability] = useState(0);
  const [downtime, setDowntime] = useState(0);
  const [disconnections, setDisconnections] = useState(0);

  useEffect(() => {
    const disconnectionsCount = logs.filter(
      (log) => log.status === "offline"
    ).length;
    setDisconnections(disconnectionsCount); // Keep the total disconnections

    if (logs.length === 0) {
      setAvailability(0);
      setDowntime(0);
      return;
    }

    let totalUptime = 0;
    let totalDowntime = 0;

    for (let i = 0; i < logs.length - 1; i++) {
      const currentLog = new Date(logs[i].timestamp);
      const nextLog = new Date(logs[i + 1].timestamp);
      if (logs[i].status === "online") {
        totalUptime += nextLog - currentLog;
      } else {
        totalDowntime += nextLog - currentLog;
      }
    }

    const lastLog = new Date(logs[logs.length - 1].timestamp);
    const currentTime = new Date();

    if (logs[logs.length - 1].status === "online") {
      totalUptime += currentTime - lastLog; // Time online until now
    } else {
      totalDowntime += currentTime - lastLog; // Time offline until now
    }

    const totalDuration = totalUptime + totalDowntime;
    const calculatedAvailability = totalDuration
      ? ((totalUptime / totalDuration) * 100).toFixed(2)
      : 0;

    setAvailability(calculatedAvailability);
    setDowntime((totalDowntime / 1000).toFixed(0)); // Convert to seconds
  }, [logs]);

  return (
    <div className="general-stats  p-6 mb-6 ">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        General Statistics
      </h2>
      <div className="space-y-2">
        <p className="text-gray-600">
          <strong>Total Disconnections:</strong> {disconnections}
        </p>
        <p className="text-gray-600">
          <strong>Availability:</strong> {availability}%
        </p>
        <p className="text-gray-600">
          <strong>Downtime:</strong> 😎 seconds
        </p>
      </div>
    </div>
  );
}

export default GeneralStats;
