import DashboardShell from '@/shared/components/layout/DashboardShell';
import UsersTableTabs from '@/features/users/components/UsersTableTabs';

export default function UsersPage() {
  return (
    <DashboardShell>
      <UsersTableTabs />
    </DashboardShell>
  );
}
