'use client';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContact, updateContact } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { useContactStore } from '@/lib/zustandStore';
import { useEffect, useState } from 'react';

export default function ContactFormPage() {

  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'add';
  const { editContactData, clearEditContactData } = useContactStore();
  const [isLoadingForm, setIsLoadingForm] = useState(mode === 'edit');

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  useEffect(() => {
    if (mode === 'edit' && editContactData) {
      Object.keys(editContactData).forEach((key) => setValue(key, editContactData[key]));
      setIsLoadingForm(false);
    }
  }, [editContactData, mode]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // success | error | warning | info
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));

  };
  const mutation = useMutation({
    mutationFn: (data) =>
      mode === 'edit'
        ? updateContact(editContactData.id, data)
        : createContact(data),
    onSuccess: () => {
      try {
        queryClient.invalidateQueries(['contacts']);
        clearEditContactData();
        reset();
        setSnackbar({
          open: true,
          message: mode === 'edit' ? 'Contact updated successfully!' : 'Contact added successfully!',
          severity: 'success',
        });
        router.push('/contacts');

      } catch (error) {
        console.log(error)
      }

    },
  });

  // If loading → show loader
  if (isLoadingForm) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#f7fafc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f7fafc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 700,
          height: 750,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          bgcolor: '#ffffff',
        }}
      >
        <Box sx={{ bgcolor: '#5c6ac4', p: 2 }}>
          <Typography variant="h6" color="#f7fafc" fontWeight="bold" textAlign="center">
            {mode === 'edit' ? 'Edit Contact' : 'Add New Contact'}
          </Typography>
        </Box>

        {/* Form */}

        <Box
          component="form"
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          sx={{
            flex: 1,
            p: 3,
            bgcolor: '#f9fbfd',
            display: 'flex',
            flexDirection: 'column',
          }}
        >

          {snackbar.open && (
            <Box
              sx={{
                bgcolor: snackbar.severity === 'success' ? '#d1fae5' : '#fee2e2',
                color: snackbar.severity === 'success' ? '#065f46' : '#991b1b',
                px: 3,
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <span>{snackbar.message}</span>
              <Button
                onClick={handleCloseSnackbar}
                sx={{
                  minWidth: 'auto',
                  color: 'inherit',
                  fontSize: '1.1rem',
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ×
              </Button>
            </Box>
          )}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 550,
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Stack spacing={1.5}>
                {/* Full Name */}
                <Box>
                  <Typography fontSize={14} fontWeight={500} color="#1e293b" mb={0.5}>
                    Full Name <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    size="medium"
                    fullWidth
                    InputProps={{ sx: { height: 50, fontSize: '1rem' } }}
                    {...register('name', { required: 'Name is required' })}
                    error={!!errors.name}
                  />
                  <Typography variant="caption" color="error">
                    {errors.name?.message}
                  </Typography>
                </Box>

                {/* Email */}
                <Box>
                  <Typography fontSize={14} fontWeight={500} color="#1e293b" mb={0.5}>
                    Email Address <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    size="medium"
                    fullWidth
                    InputProps={{ sx: { height: 50, fontSize: '1rem' } }}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' },
                    })}
                    error={!!errors.email}
                  />
                  <Typography variant="caption" color="error">
                    {errors.email?.message}
                  </Typography>
                </Box>

                {/* Phone */}
                <Box>
                  <Typography fontSize={14} fontWeight={500} color="#1e293b" mb={0.5}>
                    Phone Number <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    size="medium"
                    fullWidth
                    InputProps={{ sx: { height: 50, fontSize: '1rem' } }}
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Phone must be 10 digits' },
                    })}
                    error={!!errors.phone}
                  />
                  <Typography variant="caption" color="error">
                    {errors.phone?.message}
                  </Typography>
                </Box>

                {/* Address */}
                <Box>
                  <Typography fontSize={14} fontWeight={500} color="#1e293b" mb={0.5}>
                    Address <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    size="medium"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={3}
                    InputProps={{ sx: { fontSize: '1rem' } }}
                    {...register('address', { required: 'Address is required' })}
                    error={!!errors.address}
                  />
                  <Typography variant="caption" color="error">
                    {errors.address?.message}
                  </Typography>
                </Box>

                {/* Favourite */}
                <FormControlLabel
                  control={<Checkbox {...register('favourite')} />}
                  label="Mark as Favourite"
                  sx={{ color: '#1e293b', mt: 1 }}
                />
              </Stack>
            </Box>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 3,
                py: 1,
                color: '#fff',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                minWidth: 120,
                height: 40,
                bgcolor: '#5c6ac4',
                '&:hover': {
                  bgcolor: '#3f51b5',
                },
              }}
            >
              {mode === 'edit' ? 'Save Changes' : 'Add'}
            </Button>

            <Button
              component={Link}
              href="/contacts"
              sx={{
                px: 3,
                py: 1,
                color: '#fff',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                minWidth: 120,
                height: 40,
                bgcolor: '#5c6ac4',
                '&:hover': {
                  bgcolor: '#3f51b5',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}



