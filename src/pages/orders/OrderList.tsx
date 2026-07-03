import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, PackageSearch } from 'lucide-react'
import { PageHeader, EmptyState } from '@/components/ui/Misc'
import { Card } from '@/components/ui/Card'
import { Input, Select } from '@/components/ui/Form'
import { Table, Thead, Th, Tr, Td } from '@/components/ui/Table'
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/ui/Badge'
import { Pagination } from '@/components/ui/Pagination'
import { Button } from '@/components/ui/Button'
import { orders } from '@/data/store'
import { formatINR, formatDate } from '@/lib/utils'
import type { OrderStatus } from '@/types'

const PAGE_SIZE = 10
const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Return Requested']

export default function OrderList() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesQuery =
        query.trim() === '' ||
        o.orderNo.toLowerCase().includes(query.toLowerCase()) ||
        o.customerName.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'all' || o.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = [...filtered].sort((a, b) => +new Date(b.placedAt) - +new Date(a.placedAt)).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <PageHeader title="Orders" subtitle={`${orders.length} total orders`} />

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <Input
              placeholder="Search by order no. or customer…"
              className="pl-9"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
            />
          </div>
          <Select
            className="w-52"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
          >
            <option value="all">All Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>

        {pageItems.length === 0 ? (
          <EmptyState title="No orders found" subtitle="Try a different search or filter." icon={<PackageSearch size={20} />} />
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>Order</Th>
                <Th>Customer</Th>
                <Th>Items</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
                <Th className="text-right">Total</Th>
                <Th className="text-right">Actions</Th>
              </Tr>
            </Thead>
            <tbody>
              {pageItems.map((o) => (
                <Tr key={o.id}>
                  <Td>
                    <p className="font-medium text-ink">{o.orderNo}</p>
                    <p className="text-xs text-ink-muted">{formatDate(o.placedAt, true)}</p>
                  </Td>
                  <Td>{o.customerName}</Td>
                  <Td className="text-ink-muted">{o.items.length} item(s)</Td>
                  <Td>
                    <PaymentStatusBadge status={o.paymentStatus} />
                  </Td>
                  <Td>
                    <OrderStatusBadge status={o.status} />
                  </Td>
                  <Td className="text-right font-medium">{formatINR(o.total)}</Td>
                  <Td className="text-right">
                    <Link to={`/orders/${o.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye size={15} />
                      </Button>
                    </Link>
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
