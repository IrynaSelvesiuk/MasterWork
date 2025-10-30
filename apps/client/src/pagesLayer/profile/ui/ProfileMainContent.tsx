import { SettingsSection } from '@/widgets/settings-section';
import { WalletSummary } from './WalletSummary';
import { StudentResponse } from '@/entities/student/model/student';

interface Props {
  student: StudentResponse;
}

export const ProfileMainContent = ({ student }: Props) => (
  <section className="lg:col-span-2 space-y-8">
    <WalletSummary walletBalance={student.walletBalance} />
    <SettingsSection />
  </section>
);
