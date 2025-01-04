import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#323232' },
    text: { primary: '#93a174', secondary: '#c1c7ab' },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#f6eed6' },
    text: { primary: '#5d6a43', secondary: '#3a432a' },
  },
});
