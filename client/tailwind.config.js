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
            spacing: {},
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                white: '#FFFFFF',
                black: '#000000',
                dark: {
                    100: '#171A1A',
                    200: '#202328',
                    300: '#333333',
                },
                gray: {
                    100: '#6F7A8B',
                    200: '#999999',
                    300: '#989DA5',
                    400: '#c4c4c4',
                },
                khaki: {
                    100: '#333300',
                    200: '#4D4D1A',
                    300: '#666633',
                    400: '#80804D',
                    500: '#999966',
                    600: '#B2B27F',
                    700: '#CCCC99',
                    800: '#E6E6B3',
                },
                yellow: {
                    100: '#FFFFCC',
                    200: '#FFFFE5',
                },
            },
            opacity: {},
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
            fontFamily: {
                sans: [ 'PT Sans', 'Inter', 'Arial', 'sans-serif'],
            },
            fontSize: {},
            boxShadow: {},
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
