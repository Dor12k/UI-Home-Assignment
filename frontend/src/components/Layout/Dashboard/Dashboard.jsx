import React, { useState } from "react";

export default function Dashboard() {
  // --- Sample data ---
  const [gpsData] = useState([
    { timestamp: 1.234, lat: 32.123, lon: 34.567, alt: 100 },
    { timestamp: 2.345, lat: 32.124, lon: 34.568, alt: 101 },
    { timestamp: 3.456, lat: 32.125, lon: 34.569, alt: 102 },
  ]);

  const [odomData] = useState([
    {
      timestamp: 1.234,
      position: { x: 0.1, y: 0.2, z: 0.3 },
      orientation: { x: 0, y: 0, z: 0, w: 1 },
    },
    {
      timestamp: 2.345,
      position: { x: 0.2, y: 0.3, z: 0.4 },
      orientation: { x: 0, y: 0.1, z: 0, w: 0.99 },
    },
    {
      timestamp: 3.456,
      position: { x: 0.3, y: 0.4, z: 0.5 },
      orientation: { x: 0, y: 0.2, z: 0, w: 0.98 },
    },
  ]);

  return (
    <div className="flex-1 bg-gray-900 p-4 border-l border-gray-800 h-full">
      {/* Scrollable content */}
      <div className="bg-gray-800 rounded-lg p-4 h-full overflow-y-auto border border-gray-700 shadow-md">
        <h2 className="text-teal-400 text-2xl font-semibold mb-6">📊 Data Dashboard</h2>

        <div className="grid grid-cols-2 gap-8">
          {/* GPS Table */}
          <div>
            <h3 className="text-teal-300 text-lg mb-3 border-b border-gray-600 pb-1">GPS Data</h3>
            <div className="overflow-y-auto max-h-64 border border-gray-700 rounded-lg bg-gray-900 p-2">
              <table className="w-full text-sm table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-800 border-b border-gray-700 text-teal-400">
                    <th className="px-2 py-1">Timestamp</th>
                    <th className="px-2 py-1">Lat</th>
                    <th className="px-2 py-1">Lon</th>
                    <th className="px-2 py-1">Alt</th>
                  </tr>
                </thead>
                <tbody>
                  {gpsData.map((g, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-2 py-1">{g.timestamp.toFixed(3)}</td>
                      <td className="px-2 py-1">{g.lat}</td>
                      <td className="px-2 py-1">{g.lon}</td>
                      <td className="px-2 py-1">{g.alt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Odometry Table */}
          <div>
            <h3 className="text-teal-300 text-lg mb-3 border-b border-gray-600 pb-1">
              Odometry Data
            </h3>
            <div className="overflow-y-auto max-h-64 border border-gray-700 rounded-lg bg-gray-900 p-2">
              <table className="w-full text-sm table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-800 border-b border-gray-700 text-teal-400">
                    <th className="px-2 py-1">Time</th>
                    <th className="px-2 py-1">X</th>
                    <th className="px-2 py-1">Y</th>
                    <th className="px-2 py-1">Z</th>
                    <th className="px-2 py-1">Quat (X,Y,Z,W)</th>
                  </tr>
                </thead>
                <tbody>
                  {odomData.map((o, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-2 py-1">{o.timestamp.toFixed(3)}</td>
                      <td className="px-2 py-1">{o.position.x}</td>
                      <td className="px-2 py-1">{o.position.y}</td>
                      <td className="px-2 py-1">{o.position.z}</td>
                      <td className="px-2 py-1">
                        {o.orientation.x}, {o.orientation.y}, {o.orientation.z}, {o.orientation.w}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
