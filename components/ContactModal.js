// 'use client';
// import { useContactStore } from '@/lib/zustandStore';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { deleteContact } from '@/lib/api';
// import { useRouter } from 'next/navigation';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   Stack,
// } from '@mui/material';


// export default function ContactModal() {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const {
//     selectedContact,
//     clearSelectedContact,
//     setEditContactData, // New from store
//   } = useContactStore();

//   const del = useMutation({
//     mutationFn: () => deleteContact(selectedContact.id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['contacts']);
//       clearSelectedContact();
//     },
//   });

//   const handleDelete = () => {
//     if (confirm('Are you sure you want to delete this contact?')) {
//       del.mutate();
//     }
//   };

//   const handleEdit = () => {
//     setEditContactData(selectedContact);
//     router.push('/contacts/add?mode=edit');
//   };
//   if (!selectedContact) return null;

//   return (
//     <Dialog open={!!selectedContact} onClose={clearSelectedContact} fullWidth maxWidth="sm">
//       <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Details</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2} mt={1}>
//           <Box>
//             <Typography variant="caption" color="textSecondary">Name:</Typography>
//             <Typography variant="h6">{selectedContact.name}</Typography>
//           </Box>
//           <Box>
//             <Typography variant="caption" color="textSecondary">Email:</Typography>
//             <Typography>{selectedContact.email}</Typography>
//           </Box>
//           <Box>
//             <Typography variant="caption" color="textSecondary">Phone:</Typography>
//             <Typography>{selectedContact.phone}</Typography>
//           </Box>
//           <Box>
//             <Typography variant="caption" color="textSecondary">Address:</Typography>
//             <Typography>{selectedContact.address}</Typography>
//           </Box>
//           <Box>
//             <Typography variant="caption" color="textSecondary">Favourite:</Typography>
//             <Typography>{selectedContact.favourite ? '⭐ Yes' : 'No'}</Typography>
//           </Box>
//         </Stack>
//       </DialogContent>

//       <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
//         <Button variant="outlined" color="error" onClick={handleDelete}>
//           Delete
//         </Button>

//         <Button variant="outlined" color="primary" onClick={handleEdit}>
//           Edit
//         </Button>

//         <Button
//           onClick={clearSelectedContact}
//           variant="contained"
//           sx={{ bgcolor: '#4f8cf7', color: '#fff' }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }


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
    setEditContactData,
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
            <Typography variant="caption" color="#6b7280">
              Name:
            </Typography>
            <Typography variant="h6" color="#1e293b">
              {selectedContact.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="#6b7280">
              Email:
            </Typography>
            <Typography color="#1e293b">{selectedContact.email}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="#6b7280">
              Phone:
            </Typography>
            <Typography color="#1e293b">{selectedContact.phone}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="#6b7280">
              Address:
            </Typography>
            <Typography color="#1e293b">{selectedContact.address}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="#6b7280">
              Favourite:
            </Typography>
            <Typography color="#1e293b">
              {selectedContact.favourite ? '⭐ Yes' : 'No'}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      {/* <DialogActions
        sx={{
          justifyContent: 'space-between',
          bgcolor: '#eef1f7',
          p: 2,
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          onClick={handleEdit}
          sx={{
            borderColor: '#5c6ac4',
            color: '#5c6ac4',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#eef1f7',
              borderColor: '#5c6ac4',
            },
          }}
        >
          Edit
        </Button>

        <Button
          onClick={clearSelectedContact}
          variant="contained"
          sx={{
            bgcolor:'#5c6ac4',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#e67734',
            },
          }}
        >
          Close
        </Button>
      </DialogActions> */}

      <DialogActions
        sx={{
          bgcolor: '#eef1f7',
          p: 2,
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'center',
          gap: 1.5, // 👈 spacing between buttons
          flexWrap: 'wrap', // responsive in small screens
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 100,
          }}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          onClick={handleEdit}
          sx={{
            borderColor: '#5c6ac4',
            color: 'white',
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 100,
            '&:hover': {
              bgcolor: 'blue',
              borderColor: '#5c6ac6',
            },
          }}
        >
          Edit
        </Button>

        <Button
          onClick={clearSelectedContact}
          variant="contained"
          sx={{
            bgcolor: '#5c6ac4',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 100,
            '&:hover': {
              bgcolor: '#4b5abf',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>

    </Dialog>
  );
}
