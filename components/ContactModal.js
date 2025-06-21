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


export default function ContactModal() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    selectedContact,
    clearSelectedContact,
    setEditContactData, // New from store
  } = useContactStore();

  const del = useMutation({
    mutationFn: () => deleteContact(selectedContact.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      clearSelectedContact();
    },
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      del.mutate();
    }
  };

  const handleEdit = () => {
    setEditContactData(selectedContact);
    router.push('/contacts/add?mode=edit');
  };
  if (!selectedContact) return null;

  return (
    <Dialog open={!!selectedContact} onClose={clearSelectedContact} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Box>
            <Typography variant="caption" color="textSecondary">Name:</Typography>
            <Typography variant="h6">{selectedContact.name}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">Email:</Typography>
            <Typography>{selectedContact.email}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">Phone:</Typography>
            <Typography>{selectedContact.phone}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">Address:</Typography>
            <Typography>{selectedContact.address}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">Favourite:</Typography>
            <Typography>{selectedContact.favourite ? '⭐ Yes' : 'No'}</Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>

        <Button variant="outlined" color="primary" onClick={handleEdit}>
          Edit
        </Button>

        <Button
          onClick={clearSelectedContact}
          variant="contained"
          sx={{ bgcolor: '#4f8cf7', color: '#fff' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
