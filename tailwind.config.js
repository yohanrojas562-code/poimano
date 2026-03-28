import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.tsx',
        './resources/**/*.ts',
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#00105E',
                    50: '#E6E8F2',
                    100: '#CCD1E5',
                    200: '#99A3CB',
                    300: '#6675B1',
                    400: '#334797',
                    500: '#00105E',
                    600: '#000D4B',
                    700: '#000A38',
                    800: '#000725',
                    900: '#000312',
                },
                cyan: {
                    DEFAULT: '#00E1FF',
                    50: '#E6FCFF',
                    100: '#CCF9FF',
                    200: '#99F3FF',
                    300: '#66EDFF',
                    400: '#33E7FF',
                    500: '#00E1FF',
                    600: '#00B4CC',
                    700: '#008799',
                    800: '#005A66',
                    900: '#002D33',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
