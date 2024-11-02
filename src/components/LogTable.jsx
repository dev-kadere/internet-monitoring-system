import React from "react";

const LogTable = () => {
  const logs = JSON.parse(localStorage.getItem("connectionLogs") || "[]");

  return (
    <div className="log-table-container max-h-64 overflow-y-auto  rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        Connection Logs
      </h3>
      <table className="log-table w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Date and Time</th>
            <th className="border p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border p-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td
                  className={`border p-2 font-semibold ${
                    log.status === "online" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {log.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="2">
                No connection logs available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
