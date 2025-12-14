import { Link } from '@tanstack/react-router';

// Dummy data for current enrollments - API not ready yet
const dummyEnrollments = [
  {
    id: 1,
    moduleName: 'React Advanced Patterns',
    progress: 65,
    status: 'In Progress',
    startDate: '2024-01-15',
    dueDate: '2024-03-15',
  },
  {
    id: 2,
    moduleName: 'TypeScript Fundamentals',
    progress: 30,
    status: 'In Progress',
    startDate: '2024-02-01',
    dueDate: '2024-04-01',
  },
];

export default function EnrollmentCurrent() {
  const enrollments = dummyEnrollments;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Current Enrollment</h1>

      {enrollments && enrollments.length > 0 ? (
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">{enrollment.moduleName || 'Module'}</h3>
              <p className="text-sm text-gray-600">Progress: {enrollment.progress || 0}%</p>
              <p className="text-sm text-gray-600">Status: {enrollment.status || 'In Progress'}</p>
              <Link to="/employee/submission" className="text-indigo-800 hover:underline text-sm">
                Submit Final Work
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No current enrollments</p>
      )}

      <Link to="/employee/history" className="text-indigo-800 hover:underline">
        View History
      </Link>
    </div>
  );
}
