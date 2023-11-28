import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#171A1A',
            dark: '#202328',
            light: '#333333',
            contrastText: '#fff',
        },
        secondary: {
            main: '#333300',
            dark: '#4D4D1A',
            light: '#666633',
            contrastText: '#fff',
        },
        three: {
            main: '#6F7A8B',
            dark: '#999999',
            light: '#989DA5',
            contrastText: '#171A1A',
        },
        background: {
            default: '#f5f5f5',
            paper: '#fff',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
        error: {
            main: '#f44336',
        },
        success: {
            main: '#4caf50',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                },
            },
        },
    },
});

export default theme;