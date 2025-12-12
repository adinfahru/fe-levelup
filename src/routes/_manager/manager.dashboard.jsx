import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import DashboardTable from "../../components/manager/DashboardTable";

export const Route = createFileRoute("/_manager/manager/dashboard")({
  component: ManagerDashboard,
});

function ManagerDashboard() {
  const [searchIdle, setSearchIdle] = useState("");
  const [searchEnroll, setSearchEnroll] = useState("");

  const dummyIdle = [
    { firstName: "Alice", lastName: "Walker", email: "alice@example.com", status: "Idle" },
    { firstName: "Bob", lastName: "Marley", email: "bob@example.com", status: "Idle" },
    { firstName: "John", lastName: "Doe", email: "john@example.com", status: "Idle" },
    { firstName: "Jane", lastName: "Smith", email: "jane@example.com", status: "Not Idle" },
  ];

  const dummyEnroll = [
    { firstName: "Alice", lastName: "Walker", email: "alice@example.com", status: "Idle" },
    { firstName: "Bob", lastName: "Marley", email: "bob@example.com", status: "Idle" },
  ];

  const filteredIdle = dummyIdle.filter((u) =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchIdle.toLowerCase())
  );

  const filteredEnroll = dummyEnroll.filter((u) =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchEnroll.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Total User Idle", "Total User Enroll", "Total Module"].map((title, i) => (
          <div
            key={i}
            className="bg-gray-100 border rounded-xl p-4 flex gap-4 items-center shadow-sm"
          >
            <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-xl font-bold">{i === 0 ? 27 : i === 1 ? 25 : 8}</p>
            </div>
          </div>
        ))}
      </div>

      {/* List User Enroll */}
      <SectionTable
        title="List User Enroll"
        searchValue={searchEnroll}
        onSearchChange={setSearchEnroll}
        data={filteredEnroll}
      />

      {/* List User Idle */}
      <SectionTable
        title="List User"
        searchValue={searchIdle}
        onSearchChange={setSearchIdle}
        data={filteredIdle}
      />
    </div>
  );
}

function SectionTable({ title, searchValue, onSearchChange, data }) {
  const [filterValue, setFilterValue] = useState("");

  const filteredData = [...data]
    .filter((row) =>
      `${row.firstName} ${row.lastName}`.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      if (filterValue === "az")
        return a.firstName.localeCompare(b.firstName);
      if (filterValue === "za")
        return b.firstName.localeCompare(a.firstName);
      return 0;
    });

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <select
          className="border px-3 py-2 rounded-md text-sm"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="">Filter</option>
          <option value="az">Name A-Z</option>
          <option value="za">Name Z-A</option>
        </select>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full border rounded-md px-3 py-2 text-sm pr-10"
          />
          <span className="absolute right-3 top-2.5 text-gray-500 text-sm">🔍</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-center">{title}</h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{row.firstName}</td>
                <td className="px-4 py-2">{row.lastName}</td>
                <td className="px-4 py-2">{row.email}</td>

                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      row.status === "Idle"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-4 py-2 flex gap-2 justify-center">

                  {/* Read detail */}
                  <button className="px-3 py-1 border rounded bg-blue-600 text-white text-xs hover:bg-blue-700">
                    Read
                  </button>

                  {/* Activate / Deactivate */}
                  {row.status === "Idle" ? (
                    <button className="px-3 py-1 border rounded bg-red-600 text-white text-xs hover:bg-red-700">
                      Deactivate Idle
                    </button>
                  ) : (
                    <button className="px-3 py-1 border rounded bg-green-600 text-white text-xs hover:bg-green-700">
                      Activate Idle
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


<DashboardTable/>
