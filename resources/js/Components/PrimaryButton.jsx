export default function PrimaryButton({
  className = '',
  disabled,
  children,
  bgColor = 'bg-gray-800',
  bgHoverColor = 'hover:bg-gray-700',
  bgFocusColor = 'focus:bg-gray-700',
  bgActiveColor = 'active:bg-gray-900',
  ringColor = 'focus:ring-indigo-500',
  textColor = 'text-white',
  ...props
}) {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest
        ${bgColor} ${bgHoverColor} ${bgFocusColor} ${bgActiveColor}
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringColor}
        ${textColor}
        ${disabled ? 'opacity-25 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
