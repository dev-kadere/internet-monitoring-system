import React from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const ExportOptions = () => {
  const logs = JSON.parse(localStorage.getItem("connectionLogs") || "[]");

  const exportToCSV = () => {
    const csvHeaders = "Timestamp,Status\n";
    const csvData = logs
      .map((log) => `${log.timestamp},${log.status}`)
      .join("\n");
    const csvContent = csvHeaders + csvData;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "connection_logs.csv");
    alert("CSV file has been downloaded.");
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Internet Connection Logs", 10, 10);

    logs.forEach((log, index) => {
      const yPosition = 20 + (index % 25) * 10; // Position text within page limits
      pdf.text(`${log.timestamp} - ${log.status}`, 10, yPosition);

      if ((index + 1) % 25 === 0) {
        pdf.addPage(); // Add a new page after 25 entries
      }
    });

    pdf.save("connection_logs.pdf");
    alert("PDF file has been downloaded.");
  };

  return (
    <div className="export-options  p-4 mb-4 rounded-lg shadow-md flex justify-center space-x-4">
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200"
      >
        Export to CSV
      </button>
      <button
        onClick={exportToPDF}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200"
      >
        Export to PDF
      </button>
    </div>
  );
};

export default ExportOptions;
