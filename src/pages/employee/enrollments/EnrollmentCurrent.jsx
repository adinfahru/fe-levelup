import { Link } from '@tanstack/react-router';

export default function EnrollmentCurrent() {
  return (
    <div>
      <h1>Current Enrollment</h1>
      <div>
        <p>Your current enrollment progress</p>
        <Link to="/employee/submission">Submit Final Work</Link>
      </div>
      <Link to="/employee/history">View History</Link>
    </div>
  );
}
