// 'use client';
// import { useEffect, useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { fetchContacts, toggleFavourite } from '@/lib/api';
// import Link from 'next/link';
// import {
//   Container, Typography, List, ListItemText, Button, Pagination,
//   TextField, Box, IconButton, Checkbox, Paper, Stack
// } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import ContactModal from '@/components/ContactModal';
// import { useContactStore } from '@/lib/zustandStore';
// import { useRouter } from 'next/navigation';


// export default function ContactsPage() {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const { showFavouritesOnly, toggleFavouritesOnly, selectedContact, setSelectedContact } = useContactStore();
//   const queryClient = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ['contacts', page, search, showFavouritesOnly],
//     queryFn: () => fetchContacts(page, search, showFavouritesOnly),
//   });


//   const { clearSelectedContact } = useContactStore();

//   useEffect(() => {
//     clearSelectedContact(); // 👈 Clear modal state on mount
//   }, []);

//   const handleToggleFavourite = async (contact) => {
//     await toggleFavourite(contact);
//     queryClient.invalidateQueries(['contacts']);
//   };

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
//               placeholder="Search contact"
//               size="small"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
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
//           ) : data?.contacts?.length ? (
//             <List>
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
//                   <IconButton onClick={(e) => {
//                     e.stopPropagation();
//                     handleToggleFavourite(contact);
//                   }}>
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

//         {/* Pagination */}
//         {data?.totalPages > 1 && (
//           <Box display="flex" justifyContent="center" p={1}>
//             <Pagination
//               count={data.totalPages}
//               page={page}
//               onChange={(e, value) => setPage(value)}
//               color="primary"
//               size="small"
//             />
//           </Box>
//         )}

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

// ================================================================================================ 1 


// 'use client';
// import { useEffect, useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { fetchContacts, toggleFavourite } from '@/lib/api';
// import Link from 'next/link';
// import {
//   Typography, List, Button, Pagination,
//   TextField, Box, IconButton, Checkbox, Paper, Stack
// } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import ContactModal from '@/components/ContactModal';
// import { useContactStore } from '@/lib/zustandStore';

// export default function ContactsPage() {
//   const [page, setPage] = useState(1);
//   const [searchInput, setSearchInput] = useState('');
//   const [search, setSearch] = useState('');

//   const { showFavouritesOnly, toggleFavouritesOnly, selectedContact, setSelectedContact, clearSelectedContact } = useContactStore();
//   const queryClient = useQueryClient();

//   // ✅ Debounce the search input
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       setSearch(searchInput);
//       setPage(1); // Reset to page 1 on new search
//     }, 400);

//     return () => clearTimeout(delayDebounce);
//   }, [searchInput]);

//   useEffect(() => {
//     clearSelectedContact(); // Clear modal on mount
//   }, []);

//   const { data, isLoading } = useQuery({
//     queryKey: ['contacts', page, search, showFavouritesOnly],
//     queryFn: () => fetchContacts(page, search, showFavouritesOnly),
//   });

//   const handleToggleFavourite = async (contact) => {
//     await toggleFavourite(contact);
//     queryClient.invalidateQueries(['contacts']);
//   };

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

// =====================================================================================


'use client';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchContacts, toggleFavourite } from '@/lib/api';
import Link from 'next/link';
import {
  Typography, List, Button,
  TextField, Box, IconButton, Checkbox, Paper, Stack
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ContactModal from '@/components/ContactModal';
import { useContactStore } from '@/lib/zustandStore';

const rowsPerPage = 3;

export default function ContactsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const { showFavouritesOnly, toggleFavouritesOnly, selectedContact, setSelectedContact, clearSelectedContact } = useContactStore();
  const queryClient = useQueryClient();

  // ✅ Debounce search input
  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Reset to first page on new search
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
        bgcolor: '#f2f4f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid #ddd', bgcolor: '#f9fbfd' }}>
          <Typography variant="h6" align="center" fontWeight="bold" color="#333">
            Contact List
          </Typography>
          <Stack spacing={1} direction="row" mt={2}>
            <TextField
              placeholder="Search contacts"
              size="small"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              fullWidth
            />
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={showFavouritesOnly}
                onChange={toggleFavouritesOnly}
              />
              <Typography variant="body2" color="text.secondary">
                Favourites
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Contact List */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {isLoading ? (
            <Typography align="center" sx={{ my: 3 }}>
              Loading...
            </Typography>
          ) : isError ? (
            <Typography align="center" sx={{ my: 3, color: 'red' }}>
              Error fetching contacts.
            </Typography>
          ) : data?.contacts?.length ? (
            <List disablePadding>
              {data.contacts.map((contact) => (
                <Paper
                  key={contact.id}
                  elevation={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    m: 1,
                    p: 1,
                    borderRadius: 2,
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedContact(contact)}
                >
                  <Box>
                    <Typography fontWeight={500}>{contact.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contact.email}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavourite(contact);
                    }}
                  >
                    {contact.favourite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                  </IconButton>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography align="center" sx={{ my: 3 }}>
              No contacts found.
            </Typography>
          )}
        </Box>

        {/* Pagination Controls */}
        <Box
          sx={{
            p: 1,
            borderTop: '1px solid #ddd',
            bgcolor: '#f9fbfd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            size="small"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Typography variant="body2">
            Page {page} of {totalPages}
          </Typography>
          <Button
            size="small"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Box>



        {/* Add Contact Button */}
        <Box sx={{ p: 2, borderTop: '1px solid #ddd', bgcolor: '#f9fbfd' }}>
          <Button
            component={Link}
            href="/contacts/add"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#6abcf8',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#4eaaf5',
              },
            }}
          >
            + ADD CONTACT
          </Button>
        </Box>

        {selectedContact && <ContactModal />}
      </Paper>
    </Box>
  );
}

// ==================================================================================

