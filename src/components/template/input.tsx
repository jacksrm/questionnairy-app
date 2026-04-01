import { forwardRef } from 'react';
import './input.css';
import { CrossCircledIcon } from '@radix-ui/react-icons';

type InputProps = React.ComponentProps<'input'> & {
  validation?: 'cpf';
  onClickReset: () => void;
  showCondition: boolean;
};

export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

export function formatPhone(value: string): string {
  const digits = value.slice(0, 11); // limit to 11 digits

  if (digits.length === 0) return '';

  if (digits.length < 3) {
    return `(${digits}`;
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, validation, onClickReset, showCondition, ...props }, ref) => {
    return (
      <div className="flex grow relative">
        {validation === 'cpf' ? (
          <input ref={ref} className={`input ${className}`} {...props} />
        ) : (
          <input ref={ref} className={`input ${className}`} {...props} />
        )}
        <button
          type="button"
          onClick={onClickReset}
          data-show={showCondition}
          className="reset-button">
          <CrossCircledIcon className="" />
        </button>
      </div>
    );
  },
);

export default Input;
