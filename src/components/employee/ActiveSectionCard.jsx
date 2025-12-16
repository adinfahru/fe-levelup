import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function ActiveSectionCard({ section }) {
  const [feedback, setFeedback] = useState('')
  const [evidenceUrl, setEvidenceUrl] = useState('')

  const handleSubmit = () => {
    const payload = {
      module_item_id: section.id,
      feedback,
      evidence_url: evidenceUrl,
    }

    console.log('SUBMIT PAYLOAD:', payload)

    // nanti tinggal:
    // POST /enrollments/items/complete
  }

  return (
    <Card className="bg-white border shadow-sm rounded-2xl p-6 space-y-6">
      <h4 className="text-sm font-semibold text-gray-700">
        {section.title}
      </h4>

      <div className="rounded-xl border p-6 space-y-5">
        {/* Description */}
        <p className="text-sm text-gray-600">
          {section.description}
        </p>

        {/* Resource */}
        <a
          href={section.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline text-sm block"
        >
          View resource
        </a>

        {/* Evidence URL */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">
            Evidence URL
          </label>
          <Input
            placeholder="https://github.com/username/repo"
            value={evidenceUrl}
            onChange={(e) => setEvidenceUrl(e.target.value)}
          />
        </div>

        {/* Feedback */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">
            Daily Report / Feedback
          </label>
          <Textarea
            placeholder="What did you learn today?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!feedback || !evidenceUrl}
          className="w-fit"
        >
          Submit & Complete Section
        </Button>
      </div>
    </Card>
  )
}