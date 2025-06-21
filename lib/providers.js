// lib/providers.js
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
const theme = createTheme(); //  generates full default MUI theme (with spacing)

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
            <CssBaseline />
                {children}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
