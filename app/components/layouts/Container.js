export default function Container({ 
    children,
    className = '',
    size = 'default',
    ...props
}) {

    const sizes = {
        default: 'max-w-7xl', //1280px max width
        narrow: 'max-w-4xl', //768px max width
        wide: 'max-w-7xl', //1280px max width
        full: 'max-w-full', //100% max width
    };

    return (
        <div
           className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}
           {...props}
        >
            {children}
        </div>
    );
}