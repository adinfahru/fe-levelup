import { Link } from '@tanstack/react-router';

export default function EnrollmentHistory() {
  return (
    <div>
      <h1>Enrollment History</h1>
      <div>
        <p>List of completed and paused enrollments</p>
      </div>
      <Link to="/employee/enrollments">Back to Current Enrollment</Link>
    </div>
  );
}
