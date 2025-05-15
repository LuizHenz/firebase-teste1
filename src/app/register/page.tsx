import { AuthLayout } from '@/components/auth/auth-layout';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <AuthLayout title="Create your StockPilot Account" description="Join us to manage your market efficiently.">
      <RegisterForm />
    </AuthLayout>
  );
}
