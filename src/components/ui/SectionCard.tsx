import type { ComponentType, ElementType, ReactNode } from 'react';

interface SectionCardProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  title?: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  iconColor?: string;
  headerContent?: ReactNode;
  titleClassName?: string;
  iconClassName?: string;
}

export default function SectionCard({
  as: Component = 'div',
  className,
  children,
  title,
  icon: Icon,
  iconColor,
  headerContent,
  titleClassName,
  iconClassName
}: SectionCardProps) {
  const classes = ['rounded-xl p-6 mb-8 border', className].filter(Boolean).join(' ');
  const hasHeader = Boolean(title || Icon || headerContent);
  const titleClasses = ['text-xl font-bold text-slate-800', titleClassName].filter(Boolean).join(' ');
  const iconClasses = ['w-5 h-5', iconColor, iconClassName].filter(Boolean).join(' ');

  return (
    <Component className={classes}>
      {hasHeader && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {Icon && <Icon className={iconClasses} />}
            {title && <h3 className={titleClasses}>{title}</h3>}
          </div>
          {headerContent && <div className="flex items-center gap-2">{headerContent}</div>}
        </div>
      )}
      {children}
    </Component>
  );
}
