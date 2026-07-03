import { ShieldCheck, DatabaseBackup, KeyRound } from 'lucide-react'
import { PageHeader } from '@/components/ui/Misc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, Thead, Th, Tr, Td } from '@/components/ui/Table'
import { activityLogs } from '@/data/store'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Security() {
  const toast = useToast()

  return (
    <div>
      <PageHeader title="Security" subtitle="Login logs, activity logs and backups" />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">JWT Authentication</p>
              <p className="text-xs text-ink-muted">Active & healthy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold-dark dark:text-gold-light">
              <KeyRound size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Password Hashing</p>
              <p className="text-xs text-ink-muted">bcrypt, salted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info">
                <DatabaseBackup size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">Auto Backup</p>
                <p className="text-xs text-ink-muted">Last: today, 3:00 AM</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast('Backup started', 'info')}>
              Run Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <Table>
          <Thead>
            <Tr>
              <Th>Admin</Th>
              <Th>Action</Th>
              <Th>IP Address</Th>
              <Th className="text-right">Time</Th>
            </Tr>
          </Thead>
          <tbody>
            {activityLogs.map((log) => (
              <Tr key={log.id}>
                <Td>{log.actor}</Td>
                <Td className="text-ink-muted">{log.action}</Td>
                <Td className="font-mono text-xs text-ink-muted">{log.ip}</Td>
                <Td className="text-right text-ink-muted">{formatDate(log.timestamp, true)}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}
