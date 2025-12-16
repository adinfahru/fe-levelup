import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ActiveSectionCard({ section }) {
  return (
    <Card className="bg-gray-200 rounded-2xl p-6">
      <p className="text-sm font-semibold mb-2">
        {section.title}
      </p>

      <div className="bg-white rounded-xl p-8 text-center space-y-4">
        <p className="text-lg font-semibold">
          Description + Link + Daily report
        </p>

        <p className="text-sm text-gray-600">
          {section.description}
        </p>

        <a
          href={section.url}
          target="_blank"
          className="text-indigo-600 underline block"
        >
          View resource
        </a>

        <Textarea
          placeholder="Write your daily report..."
        />

        <Button className="mt-2">
          Submit Report
        </Button>
      </div>
    </Card>
  )
}