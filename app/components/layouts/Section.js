import Container from "../Container";

export default function Section({ 
    children,
    className = '',
    padding = 'default',
    bg = 'white',
    containerSize = 'default',
    ...props
}) {
    const paddings = {
        none: 'py-0',
        small: 'py-12 sm:py-16',  //48px mobile, 64px tablet+
        default: 'py-16 sm:py-20', //64px mobile, 80px tablet+
        large: 'py-20 sm:py-28',   //80px mobile, 96px tablet+
    };

    const backgroundColors = {
        white: 'bg-white',
        dark: 'bg-gray-900 text-white',
        primary: 'bg-blue-600 text-white',
        gray: 'bg-gray-50',
    };  

    return (
        <section 
            className={`${paddings[padding]} ${backgroundColors[bg]} ${className}`} 
            {...props}
        >
            <Container size={containerSize}>
                {children}
            </Container>
        </section>
    );
}