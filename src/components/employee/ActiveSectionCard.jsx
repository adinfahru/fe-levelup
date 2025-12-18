import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { enrollmentAPI } from '@/api/enrollment.api';
import { useNavigate } from '@tanstack/react-router';

export default function ActiveSectionCard({ section, enrollmentId }) {
  const [feedback, setFeedback] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * 🔄 RESET FORM SETIAP GANTI SECTION
   * Ini kunci utama masalah kamu
   */
  useEffect(() => {
    setFeedback('');
    setEvidenceUrl('');
  }, [section.enrollmentItemId]); // ← GANTI SECTION = RESET

  /**
   * 🔐 LOCK RULE
   */
  const isLocked = section.isFinalSubmission && section.isCompleted;

  const handleSubmit = async () => {
    if (isLocked) return;

    setLoading(true);
    try {
      await enrollmentAPI.submitItem(enrollmentId, {
        moduleItemId: section.moduleItemId,
        feedback,
        evidenceUrl,
      });

      navigate({ to: '/employee/enrollments', replace: true });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white border shadow-sm rounded-2xl p-8 space-y-8">
      {/* TITLE */}
      <div className="space-y-1">
        <h4 className="text-lg font-semibold text-gray-900">
          {section.moduleItemTitle}
        </h4>
        <p className="text-sm text-gray-500">
          {section.moduleItemDescription}
        </p>
      </div>

      {/* RESOURCE */}
      <a
        href={section.moduleItemUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700 underline"
      >
        View resource →
      </a>

      {/* FINAL SUBMISSION INFO */}
      {isLocked && (
        <div className="flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
          <span className="text-lg">✅</span>
          <div className="text-sm">
            <p className="font-medium">Final submission has been sent</p>
            <p className="text-yellow-700">Waiting for manager review</p>
          </div>
        </div>
      )}

      {/* FORM */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Evidence URL
          </label>
          <Input
            className="text-sm"
            value={evidenceUrl}
            onChange={(e) => setEvidenceUrl(e.target.value)}
            disabled={isLocked}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Daily Report
          </label>
          <Textarea
            className="min-h-[120px] text-sm"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={isLocked}
          />
        </div>
      </div>

      {/* ACTION */}
      <Button
        onClick={handleSubmit}
        disabled={isLocked || loading || !feedback || !evidenceUrl}
        className="px-6"
      >
        {isLocked
          ? 'Waiting for Review'
          : loading
          ? 'Submitting...'
          : 'Submit & Complete Section'}
      </Button>
    </Card>
  );
}
