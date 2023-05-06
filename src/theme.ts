import { createTheme } from '@mui/material/styles';

export const globalTheme = createTheme({
    palette: {
      primary: {
        main: '#1D904E',
      },
      secondary: {
        main: '#E6F5EC',
      },
    },
    typography: {
      fontFamily: 'Noto Sans Korean, Ubuntu',
    },
    shape: {
      borderRadius: 2,
    }
});
