'use client';
import { useContactStore } from '@/lib/zustandStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContact } from '@/lib/api';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { useState } from 'react';

export default function ContactModal() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    selectedContact,
    clearSelectedContact,
    setEditContactData,
  } = useContactStore();

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const del = useMutation({
    mutationFn: () => deleteContact(selectedContact.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      clearSelectedContact();
      setOpenConfirmDelete(false);
    },
  });

  const handleDelete = () => {
    setOpenConfirmDelete(true); // open confirmation dialog
  };

  const confirmDelete = () => {
    del.mutate();
  };

  const handleEdit = () => {
    setIsRedirecting(true); // show loader/spinner on button
    setEditContactData(selectedContact);
    router.push('/contacts/add?mode=edit');
  };

  if (!selectedContact) return null;

  return (
    <>
      {/* Contact Details Dialog */}
      <Dialog open={!!selectedContact} onClose={clearSelectedContact} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            bgcolor: '#5c6ac4',
            color: '#fff',
          }}
        >
          Contact Details
        </DialogTitle>

        <DialogContent sx={{ bgcolor: '#f7fafc' }}>
          <Stack spacing={2} mt={1}>
            <Box>
              <Typography variant="caption" color="#6b7280">Name:</Typography>
              <Typography variant="h6" color="#1e293b">{selectedContact.name}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="#6b7280">Email:</Typography>
              <Typography color="#1e293b">{selectedContact.email}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="#6b7280">Phone:</Typography>
              <Typography color="#1e293b">{selectedContact.phone}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="#6b7280">Address:</Typography>
              <Typography color="#1e293b">{selectedContact.address}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="#6b7280">Favourite:</Typography>
              <Typography color="#1e293b">{selectedContact.favourite ? '⭐ Yes' : 'No'}</Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            bgcolor: '#eef1f7',
            p: 2,
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ textTransform: 'none', fontWeight: 500, minWidth: 100 }}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            onClick={handleEdit}
            disabled={isRedirecting} // Disable while loading
            sx={{
              bgcolor: '#5c6ac4',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 100,
              '&:hover': {
                bgcolor: '#3f51b5',
              },
            }}
          >
            {isRedirecting ? 'Loading...' : 'Edit'}
          </Button>

          <Button
            onClick={clearSelectedContact}
            variant="contained"
            sx={{
              bgcolor: '#5c6ac4', // primary blue (base)
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 100,
              bgcolor: '#5c6ac4', // primary blue (base)
              '&:hover': {
                bgcolor: '#3f51b5', // 👈 hover = slightly darker blue
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Confirm Delete Dialog */}
      <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
        <DialogTitle
          sx={{ bgcolor: '#fef3c7', color: '#92400e', textAlign: 'center', fontWeight: 600 }}
        >
          ⚠️ Confirm Delete
        </DialogTitle>

        <DialogContent
          sx={{ bgcolor: '#fff7ed', color: '#92400e', textAlign: 'center', p: 3 }}
        >
          <Typography>Are you sure you want to delete this contact?</Typography>
        </DialogContent>

        <DialogActions
          sx={{ bgcolor: '#fff7ed', p: 2, justifyContent: 'center', gap: 2 }}
        >
          <Button
            onClick={() => setOpenConfirmDelete(false)}
            variant="outlined"
            sx={{
              textTransform: 'none',
              color: '#92400e',
              borderColor: '#92400e',
              '&:hover': {
                bgcolor: '#fde68a',
                borderColor: '#92400e',
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 100,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
