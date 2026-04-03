import './button_label.css';

type ButtonLabelProps = React.ComponentProps<'button'> & {
  label: string;
  autoHide?: boolean;
  showLabel?: boolean;
};

export default function ButtonLabel({
  autoHide = true,
  showLabel = false,
  label,
  className,
  children,
  ...props
}: ButtonLabelProps) {
  const renderLabel = () => {
    if (autoHide) {
      return <span className="button-label-auto"> {label}</span>;
    } else {
      return (
        <span data-show={showLabel} className="button-label-manual">
          {label}
        </span>
      );
    }
  };

  return (
    <button type="button" className={`button ${className}`} {...props}>
      {renderLabel()}

      {children}
    </button>
  );
}
