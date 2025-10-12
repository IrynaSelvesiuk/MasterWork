import { SettingsSection } from '@/widgets/settings-section';
import { WalletSummary } from './WalletSummary';
import { User } from '@/entities/user';

interface Props {
  user: User;
}

export const ProfileMainContent = ({ user }: Props) => (
  <section className="lg:col-span-2 space-y-8">
    <WalletSummary walletBalance={user.walletBalance} />
    <SettingsSection />
  </section>
);
