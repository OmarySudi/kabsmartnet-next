export default function Grid({ 
    children,
    className = '',
    cols = { default: 1, sm: 2, md: 3, lg: 4, xl: 5},
    gap = 'default',
    ...props

}) {

    // Gap options - spacing between grid items
    const gaps = {
        default: 'gap-6 md:gap-8',
        small: 'gap-4',
        none: 'gap-0',
        large: 'gap-8 md:gap-12'
    };

    const gridCols = {
        default: `grid-cols-${cols.default || 1}`,
        sm: cols.sm ? `sm:grid-cols-${cols.sm}` : '',
        md: cols.md ? `md:grid-cols-${cols.md}` : '',
        lg: cols.lg ? `lg:grid-cols-${cols.lg}` : '',
        xl: cols.xl ? `xl:grid-cols-${cols.xl}` : '',
    };

    return (
        <div
            className={`grid ${gaps[gap]} ${gridCols.default} ${gridCols.sm} ${gridCols.md} ${gridCols.lg} ${gridCols.xl} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}