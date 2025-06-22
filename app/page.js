'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/contacts');
  }, [router]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
    >
      <CircularProgress color="primary" />
      <Typography mt={2} color="text.secondary">
        Redirecting...
      </Typography>
    </Box>
  );
}
