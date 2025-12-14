import { Link } from '@tanstack/react-router';

// Dummy data for enrollment history - API not ready yet
const dummyHistory = [
  {
    id: 1,
    moduleName: 'JavaScript ES6+',
    status: 'Completed',
    completedDate: '2023-12-15',
    score: 95,
  },
  {
    id: 2,
    moduleName: 'Node.js Basics',
    status: 'Completed',
    completedDate: '2023-11-20',
    score: 88,
  },
  {
    id: 3,
    moduleName: 'Git & GitHub',
    status: 'Completed',
    completedDate: '2023-10-10',
    score: 92,
  },
];

export default function EnrollmentHistory() {
  const history = dummyHistory;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Enrollment History</h1>

      {history && history.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Module</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Completed Date</th>
                <th className="px-4 py-3 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{item.moduleName || 'N/A'}</td>
                  <td className="px-4 py-3">{item.status || 'N/A'}</td>
                  <td className="px-4 py-3">{item.completedDate || 'N/A'}</td>
                  <td className="px-4 py-3">{item.score || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No enrollment history</p>
      )}

      <Link to="/employee/enrollments" className="text-indigo-800 hover:underline">
        Back to Current Enrollment
      </Link>
    </div>
  );
}
