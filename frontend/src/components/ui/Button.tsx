import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 shadow-sm',
  secondary: 'bg-brand-100 text-brand-900 hover:bg-brand-200',
  outline:
    'border border-brand-300 text-brand-800 bg-transparent hover:bg-brand-50',
  ghost: 'text-brand-800 hover:bg-brand-50',
  whatsapp: 'bg-[#167D3F] text-white hover:bg-[#137638] shadow-sm',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

type BaseButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  loading?: boolean;
};

type ButtonAsButton = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = BaseButtonProps & { to: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children, loading } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('to' in props) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = 'button', disabled, loading: _loading, ...rest } = props;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}