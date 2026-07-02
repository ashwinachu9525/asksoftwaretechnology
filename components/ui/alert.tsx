import * as React from "react"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "destructive" | "warning"
  title?: string
  icon?: boolean
  onClose?: () => void
}

export function Alert({
  className = "",
  variant = "default",
  title,
  children,
  icon = true,
  onClose,
  ...props
}: AlertProps) {
  const variantStyles = {
    default: "bg-slate-900/90 border-slate-700 text-slate-200",
    success: "bg-emerald-950/90 border-emerald-500/50 text-emerald-200",
    destructive: "bg-rose-950/90 border-rose-500/50 text-rose-200",
    warning: "bg-amber-950/90 border-amber-500/50 text-amber-200",
  }

  const IconComponent = {
    default: Info,
    success: CheckCircle2,
    destructive: XCircle,
    warning: AlertCircle,
  }[variant]

  const iconColor = {
    default: "text-blue-400",
    success: "text-emerald-400",
    destructive: "text-rose-400",
    warning: "text-amber-400",
  }[variant]

  return (
    <div
      role="alert"
      className={`relative w-full rounded-xl border p-4 shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in-50 slide-in-from-top-2 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon && <IconComponent className={`h-5 w-5 shrink-0 mt-0.5 ${iconColor}`} />}
        <div className="flex-1 text-sm">
          {title && <h5 className="font-semibold tracking-tight mb-1 text-white">{title}</h5>}
          <div className="leading-relaxed opacity-90">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close alert"
          >
            <span className="sr-only">Close</span>
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
