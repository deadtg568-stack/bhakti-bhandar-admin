import { useState } from 'react'
import { FileSpreadsheet, FileText, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, Thead, Th, Tr, Td } from '@/components/ui/Table'
import { orders } from '@/data/store'
import { products } from '@/data/products'
import { customers } from '@/data/store'
import { formatINR } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

const reportTabs = [
  { key: 'sales', label: 'Sales Report' },
  { key: 'product', label: 'Product Report' },
  { key: 'customer', label: 'Customer Report' },
  { key: 'gst', label: 'GST Report' },
] as const

export default function Reports() {
  const toast = useToast()
  const [tab, setTab] = useState<(typeof reportTabs)[number]['key']>('sales')

  function exportAs(format: 'Excel' | 'PDF') {
    toast(`Exporting ${reportTabs.find((t) => t.key === tab)?.label} as ${format}…`, 'info')
  }

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const totalGST = products.reduce((s, p) => s + (p.price * p.gstPct) / 100, 0)

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Sales, product, customer and GST reports"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => exportAs('Excel')}>
              <FileSpreadsheet size={14} /> Export Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportAs('PDF')}>
              <FileText size={14} /> Export PDF
            </Button>
          </>
        }
      />

      <div className="mb-4 flex gap-1 rounded-lg border border-border bg-surface p-1 w-fit">
        {reportTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`focus-ring rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-gold/10 text-gold-dark dark:text-gold-light' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'sales' && (
        <Card>
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
            <span className="flex items-center gap-1 text-xs text-success">
              <TrendingUp size={13} /> +18.4% vs last month
            </span>
          </CardHeader>
          <Table>
            <Thead>
              <Tr>
                <Th>Order No.</Th>
                <Th>Customer</Th>
                <Th>Status</Th>
                <Th className="text-right">Amount</Th>
              </Tr>
            </Thead>
            <tbody>
              {orders.slice(0, 10).map((o) => (
                <Tr key={o.id}>
                  <Td>{o.orderNo}</Td>
                  <Td>{o.customerName}</Td>
                  <Td className="text-ink-muted">{o.status}</Td>
                  <Td className="text-right font-medium">{formatINR(o.total)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <div className="border-t border-border px-5 py-3 text-right text-sm">
            <span className="text-ink-muted">Total Revenue: </span>
            <span className="font-semibold text-ink">{formatINR(totalRevenue)}</span>
          </div>
        </Card>
      )}

      {tab === 'product' && (
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Category</Th>
                <Th>Stock</Th>
                <Th className="text-right">Price</Th>
              </Tr>
            </Thead>
            <tbody>
              {products.slice(0, 10).map((p) => (
                <Tr key={p.id}>
                  <Td>{p.name}</Td>
                  <Td className="text-ink-muted">{p.category}</Td>
                  <Td>{p.stock}</Td>
                  <Td className="text-right font-medium">{formatINR(p.price)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {tab === 'customer' && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Summary</CardTitle>
          </CardHeader>
          <Table>
            <Thead>
              <Tr>
                <Th>Customer</Th>
                <Th>Orders</Th>
                <Th className="text-right">Lifetime Value</Th>
              </Tr>
            </Thead>
            <tbody>
              {[...customers]
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 10)
                .map((c) => (
                  <Tr key={c.id}>
                    <Td>{c.name}</Td>
                    <Td>{c.totalOrders}</Td>
                    <Td className="text-right font-medium">{formatINR(c.totalSpent)}</Td>
                  </Tr>
                ))}
            </tbody>
          </Table>
        </Card>
      )}

      {tab === 'gst' && (
        <Card>
          <CardHeader>
            <CardTitle>GST Breakdown</CardTitle>
          </CardHeader>
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>GST %</Th>
                <Th>Price</Th>
                <Th className="text-right">GST Amount</Th>
              </Tr>
            </Thead>
            <tbody>
              {products.slice(0, 10).map((p) => (
                <Tr key={p.id}>
                  <Td>{p.name}</Td>
                  <Td>{p.gstPct}%</Td>
                  <Td>{formatINR(p.price)}</Td>
                  <Td className="text-right font-medium">{formatINR((p.price * p.gstPct) / 100)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <div className="border-t border-border px-5 py-3 text-right text-sm">
            <span className="text-ink-muted">Total GST Collected (sample): </span>
            <span className="font-semibold text-ink">{formatINR(totalGST)}</span>
          </div>
        </Card>
      )}
    </div>
  )
}
