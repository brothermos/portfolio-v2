'use client';

type ExportExcelButtonProps = {
  label: string;
  title: string;
  disabled?: boolean;
  exporting?: boolean;
  onClick: () => void;
};

export function ExportExcelButton({
  label,
  title,
  disabled = false,
  exporting = false,
  onClick,
}: ExportExcelButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || exporting}
      className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-border bg-white px-2.5 text-xs font-medium text-stone-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
      title={title}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      <span>{exporting ? 'กำลังส่งออก…' : label}</span>
    </button>
  );
}
