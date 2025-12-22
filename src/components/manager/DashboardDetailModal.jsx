export default function DashboardDetailModal({ open, onClose, data }) {
  if (!open || !data) return null;

  const statusValue = data.status; // "Idle" / "Not Idle" (sesuai UI kamu)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          relative w-full max-w-md
          rounded-2xl
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.25)]
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-indigo-50 to-white">
          <h3 className="text-lg font-semibold text-gray-900">
            Employee Detail
          </h3>
          <p className="text-sm text-gray-600">
            Detailed employee information
          </p>
        </div>

        {/* CONTENT (NO space-y, biar row nempel full) */}
        <div className="py-1">
          <div className="divide-y">
            <DetailRow label="Name" value={`${data.firstName} ${data.lastName}`} />
            <DetailRow label="Email" value={data.email} />
            <DetailRow label="Role" value={data.role} />
            <DetailRow label="Position" value={data.positionName} />
            <DetailRow label="Status" value={statusValue} isStatus />
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="
              px-4 py-2 text-sm font-medium
              rounded-md
              border border-gray-300
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   ROW COMPONENT (FULL WIDTH)
========================= */
function DetailRow({ label, value, isStatus = false }) {
  const safeValue = value || "-";

  const isIdle =
    String(safeValue).toLowerCase() === "idle"; // Idle => hijau, selain itu merah

  const rowBg = isStatus
    ? isIdle
      ? "bg-emerald-50"
      : "bg-red-50"
    : "bg-white";

  const pill = isStatus
    ? isIdle
      ? "bg-emerald-600 text-white"
      : "bg-red-600 text-white"
    : "";

  return (
    <div className={`w-full ${rowBg}`}>
      {/* padding di DALAM biar background full */}
      <div className="grid grid-cols-2 items-center px-6 py-3 text-sm">
        <span className="text-gray-600">{label}</span>

        <div className="flex justify-end">
          {isStatus ? (
            <span className={`px-3 py-1 rounded-md text-xs font-semibold ${pill}`}>
              {safeValue}
            </span>
          ) : (
            <span className="font-medium text-gray-900 text-right">
              {safeValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
