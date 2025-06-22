// 'use client';
// import { useEffect, useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { fetchContacts, toggleFavourite } from '@/lib/api';
// import Link from 'next/link';
// import {
//   Typography, List, Button,
//   TextField, Box, IconButton, Checkbox, Paper, Stack
// } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import ContactModal from '@/components/ContactModal';
// import { useContactStore } from '@/lib/zustandStore';

// const rowsPerPage = 3;

// export default function ContactsPage() {
//   const [page, setPage] = useState(1);
//   const [searchInput, setSearchInput] = useState('');
//   const [search, setSearch] = useState('');

//   const { showFavouritesOnly, toggleFavouritesOnly, selectedContact, setSelectedContact, clearSelectedContact } = useContactStore();
//   const queryClient = useQueryClient();

//   // ✅ Debounce search input
//   useEffect(() => {
//     const debounce = setTimeout(() => {
//       setSearch(searchInput);
//       setPage(1); // Reset to first page on new search
//     }, 400);
//     return () => clearTimeout(debounce);
//   }, [searchInput]);

//   useEffect(() => {
//     clearSelectedContact();
//   }, []);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['contacts', page, search, showFavouritesOnly],
//     queryFn: () => fetchContacts(page, search, showFavouritesOnly),
//     keepPreviousData: true,
//   });

//   const handleToggleFavourite = async (contact) => {
//     await toggleFavourite(contact);
//     queryClient.invalidateQueries(['contacts']);
//   };

//   const totalPages = data?.totalPages || 1;

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         bgcolor: '#f2f4f8',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         p: 2,
//       }}
//     >
//       <Paper
//         elevation={5}
//         sx={{
//           width: '100%',
//           maxWidth: 400,
//           bgcolor: '#fff',
//           borderRadius: 4,
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
//         }}
//       >
//         {/* Header */}
//         <Box sx={{ p: 2, borderBottom: '1px solid #ddd', bgcolor: '#f9fbfd' }}>
//           <Typography variant="h6" align="center" fontWeight="bold" color="#333">
//             Contact List
//           </Typography>
//           <Stack spacing={1} direction="row" mt={2}>
//             <TextField
//               placeholder="Search contacts"
//               size="small"
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               fullWidth
//             />
//             <Box display="flex" alignItems="center">
//               <Checkbox
//                 checked={showFavouritesOnly}
//                 onChange={toggleFavouritesOnly}
//               />
//               <Typography variant="body2" color="text.secondary">
//                 Favourites
//               </Typography>
//             </Box>
//           </Stack>
//         </Box>

//         {/* Contact List */}
//         <Box sx={{ flex: 1, overflowY: 'auto' }}>
//           {isLoading ? (
//             <Typography align="center" sx={{ my: 3 }}>
//               Loading...
//             </Typography>
//           ) : isError ? (
//             <Typography align="center" sx={{ my: 3, color: 'red' }}>
//               Error fetching contacts.
//             </Typography>
//           ) : data?.contacts?.length ? (
//             <List disablePadding>
//               {data.contacts.map((contact) => (
//                 <Paper
//                   key={contact.id}
//                   elevation={1}
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     m: 1,
//                     p: 1,
//                     borderRadius: 2,
//                     border: '1px solid #ccc',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => setSelectedContact(contact)}
//                 >
//                   <Box>
//                     <Typography fontWeight={500}>{contact.name}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {contact.email}
//                     </Typography>
//                   </Box>
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleToggleFavourite(contact);
//                     }}
//                   >
//                     {contact.favourite ? <StarIcon color="warning" /> : <StarBorderIcon />}
//                   </IconButton>
//                 </Paper>
//               ))}
//             </List>
//           ) : (
//             <Typography align="center" sx={{ my: 3 }}>
//               No contacts found.
//             </Typography>
//           )}
//         </Box>

//         {/* Pagination Controls */}
//         <Box
//           sx={{
//             p: 1,
//             borderTop: '1px solid #ddd',
//             bgcolor: '#f9fbfd',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           <Button
//             size="small"
//             disabled={page === 1}
//             onClick={() => setPage((prev) => prev - 1)}
//           >
//             Previous
//           </Button>
//           <Typography variant="body2">
//             Page {page} of {totalPages}
//           </Typography>
//           <Button
//             size="small"
//             disabled={page === totalPages}
//             onClick={() => setPage((prev) => prev + 1)}
//           >
//             Next
//           </Button>
//         </Box>



//         {/* Add Contact Button */}
//         <Box sx={{ p: 2, borderTop: '1px solid #ddd', bgcolor: '#f9fbfd' }}>
//           <Button
//             component={Link}
//             href="/contacts/add"
//             variant="contained"
//             fullWidth
//             sx={{
//               bgcolor: '#6abcf8',
//               color: '#fff',
//               fontWeight: 'bold',
//               borderRadius: 2,
//               '&:hover': {
//                 bgcolor: '#4eaaf5',
//               },
//             }}
//           >
//             + ADD CONTACT
//           </Button>
//         </Box>

//         {selectedContact && <ContactModal />}
//       </Paper>
//     </Box>
//   );
// }

// // ==================================================================================



'use client';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchContacts, toggleFavourite } from '@/lib/api';
import Link from 'next/link';
import {
  Typography,
  List,
  Button,
  TextField,
  Box,
  IconButton,
  Checkbox,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ContactModal from '@/components/ContactModal';
import { useContactStore } from '@/lib/zustandStore';

export default function ContactsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const {
    showFavouritesOnly,
    toggleFavouritesOnly,
    selectedContact,
    setSelectedContact,
    clearSelectedContact,
  } = useContactStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(debounce);
  }, [searchInput]);

  useEffect(() => {
    clearSelectedContact();
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['contacts', page, search, showFavouritesOnly],
    queryFn: () => fetchContacts(page, search, showFavouritesOnly),
    keepPreviousData: true,
  });

  const handleToggleFavourite = async (contact) => {
    await toggleFavourite(contact);
    queryClient.invalidateQueries(['contacts']);
  };

  const totalPages = data?.totalPages || 1;

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
        {/* Header */}
        <Box sx={{ bgcolor: '#5c6ac4', p: 2 }}>
          <Typography variant="h6" color="#f7fafc" fontWeight="bold" textAlign="center">
            Contact Manager
          </Typography>
        </Box>

        {/* Search & Filter */}
        <Box sx={{ p: 2, bgcolor: '#eef1f7', borderBottom: '1px solid #e2e8f0' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              placeholder="Search contacts"
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Checkbox checked={showFavouritesOnly} onChange={toggleFavouritesOnly} />
            <Typography variant="body2" color="#1e293b">
              Favourites
            </Typography>
          </Stack>
        </Box>

        {/* Contact List */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: '#f7fafc' }}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress color="primary" />
            </Box>
          ) : isError ? (
            <Typography align="center" color="error.main" mt={4}>
              Error fetching contacts.
            </Typography>
          ) : data?.contacts?.length ? (
            <List disablePadding>
              {data.contacts.map((contact) => (
                <Paper
                  key={contact.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1,
                    my: 1,
                    borderRadius: 1,
                    border: '1px solid #e2e8f0',
                    bgcolor: '#ffffff',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#eef1f7' },
                  }}
                  onClick={() => setSelectedContact(contact)}
                >
                  <Box>
                    <Typography fontWeight={600} color="#1e293b">
                      {contact.name}
                    </Typography>
                    <Typography variant="body2" color="#6b7280">
                      {contact.email}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavourite(contact);
                    }}
                  >
                    {contact.favourite ? (
                      <StarIcon sx={{ color: '#ff8c42' }} />
                    ) : (
                      <StarBorderIcon sx={{ color: '#6b7280' }} />
                    )}
                  </IconButton>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography align="center" mt={4} color="#6b7280">
              No contacts found.
            </Typography>
          )}
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            p: 1,
            borderTop: '1px solid #e2e8f0',
            bgcolor: '#eef1f7',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,      
          }}
        >
          <Button
            size="small"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            sx={{
              textTransform: 'none',
              color: '#5c6ac4',
              fontWeight: 500,
              '&:disabled': { color: '#c7c7d2' },
            }}
          >
            Previous
          </Button>
          <Typography variant="body2" color="#1e293b">
            Page {page} of {totalPages}
          </Typography>
          <Button
            size="small"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            sx={{
              textTransform: 'none',
              color: '#5c6ac4',
              fontWeight: 500,
              '&:disabled': { color: '#c7c7d2' },
            }}
          >
            Next
          </Button>
        </Box>

        {/* Add Contact Button */}
        <Box
          sx={{
            p: 2,
            bgcolor: '#fff',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'center', // 👈 ensures button is *always* center aligned
          }}
        >
          <Button
            component={Link}
            href="/contacts/add"
            variant="contained"
            sx={{
              bgcolor: '#5c6ac4',
              color: '#fff',
              fontWeight: 500,
              textTransform: 'none',
              px: 3,                // 👈 slightly *wider* button horizontally
              py: 1,                // 👈 *taller* button vertically (looks less cramped)
              fontSize: '0.9rem',   // 👈 slightly bigger text for readability
              borderRadius: 1.5,
              '&:hover': {
                bgcolor: '#4b5abf',
              },
            }}
          >
            + Add Contact
          </Button>

        </Box>



        {selectedContact && <ContactModal />}
      </Paper>
    </Box>
  );
}
