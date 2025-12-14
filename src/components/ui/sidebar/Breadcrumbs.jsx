import { Link } from "@tanstack/react-router";

/**
 * items: array of { label: string, to?: string }
 * - label: teks yang ditampilkan
 * - to: path route (opsional, kalau ada bisa diklik)
 */
export function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center text-sm text-gray-500 space-x-1" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {item.to ? (
            <Link
              to={item.to}
              className="hover:underline cursor-pointer text-indigo-600"
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}

          {/* Separator */}
          {index < items.length - 1 && <span className="text-gray-400">{'>'}</span>}
        </div>
      ))}
    </nav>
  );
}
