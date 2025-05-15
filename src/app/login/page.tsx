import { AuthLayout } from '@/components/auth/auth-layout';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <AuthLayout title="Login to StockPilot" description="Enter your credentials to access your account.">
      <LoginForm />
    </AuthLayout>
  );
}
