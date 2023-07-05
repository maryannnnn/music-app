/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './entities/**/*.{js,ts,jsx,tsx,mdx}',
        './features/**/*.{js,ts,jsx,tsx,mdx}',
        './shared/**/*.{js,ts,jsx,tsx,mdx}',
        './stories/**/*.{js,ts,jsx,tsx,mdx}',
        './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    media: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                '0': '0',
                '1': '0.25rem',
                '2': '0.5rem',
                '3': '0.75rem',
                '4': '1rem',
                '5': '1.25rem',
                '6': '1.5rem',
                '8': '2rem',
            },
            container: {
                maxWidth: '1200px',
                margin: '300 auto',
                padding: '1rem',
            },
            wrapper: {
                minHeight: {
                    'full': '100%',
                },
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                white: '#FFFFFF',
                black: '#000000',
                gray: {
                    100: '#F7FAFC',
                    200: '#EDF2F7',
                    300: '#E2E8F0',
                    400: '#CBD5E0',
                    500: '#A0AEC0',
                    600: '#718096',
                    700: '#4A5568',
                    800: '#2D3748',
                    900: '#1A202C',
                },
            },
            opacity: {
                '0': '0',
                '20': '0.2',
                '40': '0.4',
                '60': '0.6',
                '80': '0.8',
                '100': '1',
            },
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
            fontFamily: {
                sans: ['Inter', 'Arial', 'sans-serif'],
            },
            fontSize: {
                'xs': ['0.75rem', {lineHeight: '1rem'}],
                'sm': ['0.875rem', {lineHeight: '1.25rem'}],
                'base': ['1rem', {lineHeight: '1.5rem'}],
                'lg': ['1.125rem', {lineHeight: '1.75rem'}],
                'xl': ['1.25rem', {lineHeight: '1.75rem'}],
                '2xl': ['1.5rem', {lineHeight: '2rem'}],
                '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
                '4xl': ['2.25rem', {lineHeight: '2.5rem'}],
                '5xl': ['3rem', {lineHeight: '1'}],
                '6xl': ['3.75rem', {lineHeight: '1'}],
                '7xl': ['4.5rem', {lineHeight: '1'}],
                '8xl': ['6rem', {lineHeight: '1'}],
                '9xl': ['8rem', {lineHeight: '1'}],
            },
            boxShadow: {
                'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    variants: {
        extend: {
            borderWidth: ['hover', 'focus'], // Добавляем состояния hover и focus для borderWidth
            backgroundColor: ['active'], // Добавляем состояние active для backgroundColor
        },
    },
    plugins: [],
};
