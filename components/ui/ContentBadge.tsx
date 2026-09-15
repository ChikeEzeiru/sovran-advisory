type ContentBadgeProps = {
  label: string;
  detail?: string;
};

export function ContentBadge({ label, detail }: ContentBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-xs border border-border-secondary bg-bg-secondary-alt p-1 text-xs font-medium leading-4.5 text-text-brand-secondary ${
        detail ? "pr-3" : ""
      }`}
    >
      <span className="rounded-xs border border-border-secondary bg-bg-primary px-2 py-0.5">
        {label}
      </span>
      {detail && <span className="pl-2">{detail}</span>}
    </span>
  );
}
