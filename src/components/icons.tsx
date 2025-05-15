import type { LucideProps } from 'lucide-react';
import { Store } from 'lucide-react';

export const Icons = {
  Logo: (props: LucideProps) => (
    <Store {...props} />
  ),
  StockPilotLogo: ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="12" fill="hsl(var(--primary))" />
      <path
        d="M30 70V30L50 40L70 30V70L50 60L30 70Z"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 40V60"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
