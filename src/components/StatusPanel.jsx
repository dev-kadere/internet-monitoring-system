import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";

function StatusPanel({ onLogUpdate }) {
  const [status, setStatus] = useState(navigator.onLine ? "online" : "offline");
  const [lastStatus, setLastStatus] = useState(status);
  const [onlineDuration, setOnlineDuration] = useState(
    parseInt(localStorage.getItem("onlineDuration")) || 0
  );
  const [offlineDuration, setOfflineDuration] = useState(
    parseInt(localStorage.getItem("offlineDuration")) || 0
  );
  const [startTime, setStartTime] = useState(
    localStorage.getItem("startTime")
      ? parseInt(localStorage.getItem("startTime"))
      : null
  );

  const logEvent = (newStatus) => {
    const timestamp = new Date().toISOString();
    const newLog = { timestamp, status: newStatus };
    const existingLogs = JSON.parse(
      localStorage.getItem("connectionLogs") || "[]"
    );
    const updatedLogs = [...existingLogs, newLog];
    localStorage.setItem("connectionLogs", JSON.stringify(updatedLogs));
    onLogUpdate(updatedLogs);
  };

  const updateDurations = () => {
    if (startTime) {
      const now = Date.now();
      const duration = Math.floor((now - startTime) / 1000);
      if (status === "online") {
        setOnlineDuration((prev) => prev + duration);
        localStorage.setItem("onlineDuration", onlineDuration + duration);
      } else {
        setOfflineDuration((prev) => prev + duration);
        localStorage.setItem("offlineDuration", offlineDuration + duration);
      }
    }
  };

  const updateConnectionStatus = async () => {
    if (!navigator.onLine) {
      if (status !== "offline") {
        const now = Date.now();
        updateDurations();
        setStatus("offline");
        logEvent("offline");
        setStartTime(now);
        setLastStatus("offline");
        localStorage.setItem("startTime", now);
      }
      return;
    }

    try {
      const response = await fetch("https://api.github.com", {
        method: "GET",
        mode: "cors",
      });

      if (response.ok) {
        if (status !== "online") {
          const now = Date.now();
          updateDurations();
          setStatus("online");
          logEvent("online");
          setStartTime(now);
          setLastStatus("online");
          localStorage.setItem("startTime", now);
        }
      } else {
        if (status !== "offline") {
          const now = Date.now();
          updateDurations();
          setStatus("offline");
          logEvent("offline");
          setStartTime(now);
          setLastStatus("offline");
          localStorage.setItem("startTime", now);
        }
      }
    } catch (error) {
      if (status !== "offline") {
        const now = Date.now();
        updateDurations();
        setStatus("offline");
        logEvent("offline");
        setStartTime(now);
        setLastStatus("offline");
        localStorage.setItem("startTime", now);
      }
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      if (status !== "online") {
        const now = Date.now();
        updateDurations();
        setStatus("online");
        logEvent("online");
        setStartTime(now);
        localStorage.setItem("startTime", now);
        setLastStatus("online");
      }
    };

    const handleOffline = () => {
      if (status !== "offline") {
        const now = Date.now();
        updateDurations();
        setStatus("offline");
        logEvent("offline");
        setStartTime(now);
        localStorage.setItem("startTime", now);
        setLastStatus("offline");
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    updateConnectionStatus();

    const intervalId = setInterval(updateConnectionStatus, 5000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [status]);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="status-panel p-6 mb-6 ">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Connection Status
      </h2>
      <div className="flex items-center space-x-4">
        <FaCircle
          className={status === "online" ? "text-green-500" : "text-red-500"}
        />
        <span
          className={`font-semibold ${
            status === "online" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">
          <strong>Total Online Duration:</strong>{" "}
          {formatDuration(onlineDuration)}
        </p>
        <p className="text-gray-600">
          <strong>Total Offline Duration:</strong>{" "}
          {formatDuration(offlineDuration)}
        </p>
      </div>
    </div>
  );
}

export default StatusPanel;
