import { useMemo, useState } from 'react'
import { Search, Ban, CheckCircle2, Users2 } from 'lucide-react'
import { PageHeader, EmptyState } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Form'
import { Table, Thead, Th, Tr, Td } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { customers as initial } from '@/data/store'
import { formatINR, formatDate, initials } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

const PAGE_SIZE = 10

export default function Customers() {
  const toast = useToast()
  const [items, setItems] = useState(initial)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () =>
      items.filter(
        (c) =>
          query.trim() === '' ||
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.phone.includes(query) ||
          c.email.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function toggleBlock(id: string) {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, blocked: !c.blocked } : c)))
    const c = items.find((x) => x.id === id)
    toast(c?.blocked ? 'Customer unblocked' : 'Customer blocked', c?.blocked ? 'success' : 'error')
  }

  return (
    <div>
      <PageHeader title="Customers" subtitle={`${items.length} registered customers`} />

      <Card>
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <Input
              placeholder="Search by name, phone or email…"
              className="pl-9"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
            />
          </div>
        </div>

        {pageItems.length === 0 ? (
          <EmptyState title="No customers found" icon={<Users2 size={20} />} />
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>Customer</Th>
                <Th>Mobile</Th>
                <Th>Address</Th>
                <Th>Orders</Th>
                <Th>Total Spent</Th>
                <Th>Joined</Th>
                <Th className="text-right">Action</Th>
              </Tr>
            </Thead>
            <tbody>
              {pageItems.map((c) => (
                <Tr key={c.id}>
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold-dark dark:text-gold-light">
                        {initials(c.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{c.name}</p>
                        <p className="truncate text-xs text-ink-muted">{c.email}</p>
                      </div>
                      {c.blocked && (
                        <Badge tone="danger" className="ml-1">
                          Blocked
                        </Badge>
                      )}
                    </div>
                  </Td>
                  <Td>{c.phone}</Td>
                  <Td className="max-w-[220px] truncate text-ink-muted">{c.address}</Td>
                  <Td>{c.totalOrders}</Td>
                  <Td className="font-medium">{formatINR(c.totalSpent)}</Td>
                  <Td className="text-ink-muted">{formatDate(c.joinedAt)}</Td>
                  <Td className="text-right">
                    <Button variant={c.blocked ? 'outline' : 'ghost'} size="sm" onClick={() => toggleBlock(c.id)}>
                      {c.blocked ? (
                        <>
                          <CheckCircle2 size={13} /> Unblock
                        </>
                      ) : (
                        <>
                          <Ban size={13} className="text-danger" /> Block
                        </>
                      )}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </Card>
    </div>
  )
}
