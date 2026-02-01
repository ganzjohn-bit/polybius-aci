import type { ComponentType, ElementType, HTMLAttributes, ReactNode } from 'react';

type CardVariant = 'item' | 'section';

interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  variant?: CardVariant;
  as?: ElementType;
  children: ReactNode;
  title?: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  iconColor?: string;
  headerContent?: ReactNode;
  titleClassName?: string;
  iconClassName?: string;
}

const variantStyles: Record<
  CardVariant,
  {
    container: string;
    headerMargin: string;
    titleClasses: string;
    iconClasses: string;
    TitleTag: 'h3' | 'h4';
  }
> = {
  item: {
    container: 'bg-white rounded-lg p-4 border',
    headerMargin: 'mb-3',
    titleClasses: 'text-base font-bold text-slate-800',
    iconClasses: 'w-4 h-4',
    TitleTag: 'h4'
  },
  section: {
    container: 'rounded-xl p-6 mb-8 border',
    headerMargin: 'mb-4',
    titleClasses: 'text-xl font-bold text-slate-800',
    iconClasses: 'w-5 h-5',
    TitleTag: 'h3'
  }
};

export default function Card({
  variant = 'item',
  as: Component = 'div',
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
  const styles = variantStyles[variant];
  const classes = [styles.container, className].filter(Boolean).join(' ');
  const hasHeader = Boolean(title || Icon || headerContent);
  const titleClasses = [styles.titleClasses, titleClassName].filter(Boolean).join(' ');
  const iconClasses = [styles.iconClasses, iconColor, iconClassName].filter(Boolean).join(' ');
  const TitleTag = styles.TitleTag;

  return (
    <Component className={classes} {...rest}>
      {hasHeader && (
        <div className={`flex items-center justify-between ${styles.headerMargin}`}>
          <div className="flex items-center gap-2">
            {Icon && <Icon className={iconClasses} />}
            {title && <TitleTag className={titleClasses}>{title}</TitleTag>}
          </div>
          {headerContent && <div className="flex items-center gap-2">{headerContent}</div>}
        </div>
      )}
      {children}
    </Component>
  );
}
