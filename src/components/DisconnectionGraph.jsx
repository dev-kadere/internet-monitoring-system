import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const DisconnectionGraph = () => {
  const canvasRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("connectionLogs") || "[]");
    const disconnectData = logs.filter((log) => log.status === "offline");

    // Early exit if no data is available
    if (disconnectData.length === 0) {
      if (chart) {
        chart.destroy();
        setChart(null);
      }
      return; // No data to display
    }

    // Timestamps for the X-axis
    const timestamps = disconnectData.map((log) =>
      new Date(log.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    // Cumulative disconnection count for Y-axis
    const cumulativeDisconnections = disconnectData.map(
      (_, index) => index + 1
    );

    // Destroy previous chart instance if it exists
    if (chart) {
      chart.destroy();
    }

    // Create a new chart
    const newChart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "Cumulative Disconnections",
            data: cumulativeDisconnections,
            borderColor: "rgba(255, 0, 0, 1)",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Disconnection Count",
              color: "#333",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Time",
              color: "#333",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
        },
      },
    });

    setChart(newChart);

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [canvasRef]);

  return (
    <div className="disconnection-graph bg-white p-6 mb-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Disconnection Graph
      </h3>
      <div className="relative h-64">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default DisconnectionGraph;
