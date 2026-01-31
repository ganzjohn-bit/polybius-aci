import type { ComponentType, HTMLAttributes, ReactNode } from 'react';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  children: ReactNode;
  title?: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  iconColor?: string;
  headerContent?: ReactNode;
  titleClassName?: string;
  iconClassName?: string;
}

export default function Card({
  className,
  children,
  title,
  icon: Icon,
  iconColor,
  headerContent,
  titleClassName,
  iconClassName,
  ...rest
}: CardProps) {
  const classes = ['bg-white rounded-lg p-4 border', className].filter(Boolean).join(' ');
  const hasHeader = Boolean(title || Icon || headerContent);
  const titleClasses = ['text-base font-bold text-slate-800', titleClassName].filter(Boolean).join(' ');
  const iconClasses = ['w-4 h-4', iconColor, iconClassName].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {hasHeader && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {Icon && <Icon className={iconClasses} />}
            {title && <h4 className={titleClasses}>{title}</h4>}
          </div>
          {headerContent && <div className="flex items-center gap-2">{headerContent}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
