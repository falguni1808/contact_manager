'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContact, updateContact } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Paper, Typography, TextField, Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import Link from 'next/link';
import { useContactStore } from '@/lib/zustandStore';

export default function ContactFormPage() {
  const router = useRouter();
  const { setEditContactData } = useContactStore();

  const queryClient = useQueryClient();
  // const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'add'; // mode=add or mode=edit
  const { editContactData, clearEditContactData } = useContactStore();

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  useEffect(() => {
    if (mode === 'edit' && editContactData) {
      Object.keys(editContactData).forEach((key) => setValue(key, editContactData[key]));
    }
  }, [editContactData, mode]);

  const mutation = useMutation({
    mutationFn: (data) =>
      mode === 'edit'
        ? updateContact(editContactData.id, data)
        : createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      clearEditContactData();
      reset();
      router.push('/contacts');
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f2f4f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: '#fff',
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
        }}
      >
        <Box
          sx={{
            p: 2,
            textAlign: 'center',
            bgcolor: 'linear-gradient(90deg, #4f8cf7, #6abcf8)',
            color: '#fff',
            borderBottom: '2px solid #2196f3',
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="black">
            {mode === 'edit' ? 'Edit Contact' : '+ Add Contact'}
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          sx={{ p: 3, bgcolor: '#f9fbfd' }}
        >
          <Stack spacing={2}>
            <TextField
              placeholder="Full Name"
              size="small"
              fullWidth
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
            <TextField
              placeholder="Email Address"
              size="small"
              fullWidth
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
            <TextField
              placeholder="Phone Number"
              size="small"
              fullWidth
              {...register('phone', {
                required: 'Phone is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Phone must be 10 digits' },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
            <TextField
              placeholder="Address"
              size="small"
              fullWidth
              {...register('address', { required: 'Address is required' })}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />

            <FormControlLabel
              control={<Checkbox {...register('favourite')} />}
              label="Mark as Favourite"
            />

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: 'linear-gradient(90deg, #4f8cf7, #6abcf8)',
                  color: '#fff',
                  fontWeight: 600,
                  flex: 1,
                  borderRadius: 3,
                  textTransform: 'uppercase',
                  '&:hover': {
                    bgcolor: '#3b7de0',
                  },
                }}
              >
                {mode === 'edit' ? 'Save Changes' : '+ Add Contact'}
              </Button>

              <Button
                component={Link}
                href="/contacts"
                variant="outlined"
                sx={{
                  borderColor: '#4f8cf7',
                  color: '#4f8cf7',
                  fontWeight: 600,
                  flex: 1,
                  borderRadius: 3,
                  textTransform: 'uppercase',
                  '&:hover': {
                    bgcolor: '#f0f7ff',
                    borderColor: '#3b7de0',
                  },
                }}
              >
                Back
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

