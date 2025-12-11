import { Link } from '@tanstack/react-router';

export default function SubmissionForm() {
  return (
    <div>
      <h1>Submit Final Work</h1>
      <form>
        <p>Submission form fields will appear here</p>
      </form>
      <Link to="/employee/enrollments">Back to Enrollment</Link>
    </div>
  );
}
