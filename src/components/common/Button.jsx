'use client'

export default function BrandButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-auto md:min-w-24 text-center rounded bg-brandYellow text-white px-6 py-2 font-semiboldhover:bg-brandGreen transition disabled:opacity-50 disabled:cursor-not-allowed `}
    >
      {children}
    </button>
  )
}
