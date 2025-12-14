export default function DashboardDetailModal({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Employee Detail</h3>

        <DetailRow label="Name" value={`${data.firstName} ${data.lastName}`} />
        <DetailRow label="Email" value={data.email} />
        <DetailRow label="Role" value={data.role} />
        <DetailRow label="Position" value={data.positionName} />
        <DetailRow label="Status" value={data.status} />

        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right">{value || "-"}</span>
    </div>
  );
}
