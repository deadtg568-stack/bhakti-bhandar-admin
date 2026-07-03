import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
  totalItems: number
  pageSize: number
}

export function Pagination({ page, totalPages, onChange, totalItems, pageSize }: Props) {
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  if (totalItems === 0) return null

  return (
    <div className="flex items-center justify-between border-t border-border px-5 py-3">
      <p className="text-xs text-ink-muted">
        Showing <span className="font-medium text-ink">{start}–{end}</span> of{' '}
        <span className="font-medium text-ink">{totalItems}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onChange(page - 1)} disabled={page <= 1}>
          <ChevronLeft size={14} /> Prev
        </Button>
        <span className="text-xs text-ink-muted">
          Page {page} of {totalPages || 1}
        </span>
        <Button variant="outline" size="sm" onClick={() => onChange(page + 1)} disabled={page >= totalPages}>
          Next <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  )
}
