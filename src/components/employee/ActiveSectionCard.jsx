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
   * RESET FORM SETIAP GANTI SECTION
   * Ini kunci utama masalah kamu
   */
  useEffect(() => {
    setFeedback('');
    setEvidenceUrl('');
  }, [section.enrollmentItemId]); // ← GANTI SECTION = RESET

  /**
   * LOCK RULE
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
  <Card className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm space-y-8">
    {/* subtle accent */}
    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

    {/* HEADER */}
    <div className="relative space-y-2">
      <h4 className="text-xl font-semibold text-gray-900 leading-snug">
        {section.moduleItemTitle}
      </h4>

      <p className="text-sm text-gray-600">
        {section.moduleItemDescription || 'No description provided'}
      </p>
    </div>

    {/* RESOURCE */}
    {section.moduleItemUrl && (
      <div className="inline-flex items-center gap-2 text-sm">
        <span className="text-gray-500">Resource:</span>
        <a
          href={section.moduleItemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
        >
          Open link →
        </a>
      </div>
    )}

    {/* FINAL SUBMISSION INFO */}
    {isLocked && (
      <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4">
        <span className="text-lg">⏳</span>
        <div className="text-sm">
          <p className="font-medium text-amber-900">
            Final submission sent
          </p>
          <p className="text-amber-700">
            Waiting for manager review
          </p>
        </div>
      </div>
    )}

    {/* FORM */}
    <div className="space-y-6">
      {/* Evidence */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Evidence URL
        </label>
        <Input
          className="text-sm"
          placeholder="https://github.com/username/repo"
          value={evidenceUrl}
          onChange={(e) => setEvidenceUrl(e.target.value)}
          disabled={isLocked}
        />
      </div>

      {/* Report */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Daily Report
        </label>
        <Textarea
          className="min-h-[140px] text-sm resize-none"
          placeholder="What did you learn or complete today?"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={isLocked}
        />
      </div>
    </div>

    {/* ACTION */}
    <div className="flex justify-end pt-2">
      <Button
        onClick={handleSubmit}
        disabled={isLocked || loading || !feedback || !evidenceUrl}
        className={`
          px-6
          ${
            isLocked
              ? 'bg-gray-300 text-gray-600'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }
        `}
      >
        {isLocked
          ? 'Waiting for Review'
          : loading
          ? 'Submitting...'
          : 'Submit & Complete Section'}
      </Button>
    </div>
  </Card>
);
}