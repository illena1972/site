import { cn } from "./utils";

const variants = {
  default: "border-emerald-200 bg-emerald-50 text-emerald-700",
  gray: "border-slate-200 bg-slate-50 text-slate-600",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant] || variants.default,
        className,
      )}
      {...props}
    />
  );
}
