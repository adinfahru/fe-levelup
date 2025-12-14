import { Link } from '@tanstack/react-router';

// Dummy data for employees - API not ready yet
const dummyEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    position: 'Senior Developer',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    position: 'Frontend Developer',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    position: 'Backend Developer',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@company.com',
    position: 'Full Stack Developer',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@company.com',
    position: 'DevOps Engineer',
  },
];

export default function EmployeeList() {
  const employees = dummyEmployees;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Employee List</h1>

      <div className="border rounded-lg overflow-hidden">
        {employees && employees.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Position</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{emp.id}</td>
                  <td className="px-4 py-3">{emp.name || 'N/A'}</td>
                  <td className="px-4 py-3">{emp.email || 'N/A'}</td>
                  <td className="px-4 py-3">{emp.position || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <Link
                      to="/manager/employees/$id"
                      params={{ id: emp.id.toString() }}
                      className="text-indigo-800 hover:underline"
                    >
                      View Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-gray-500">No employees found</p>
        )}
      </div>
    </div>
  );
}
