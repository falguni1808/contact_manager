// const API_URL = 'http://localhost:3004/contacts';

// export const fetchContacts = async (page = 1, search = '', favouritesOnly = false) => {
//   const limit = 10; // 10 items per page
//   const params = new URLSearchParams({
//     _page: page,
//     _limit: limit,
//     ...(search && { name_like: search }),
//     ...(favouritesOnly && { favourite: true }),
//   });

//   const res = await fetch(`${API_URL}?${params.toString()}`);
//   if (!res.ok) throw new Error('Error fetching contacts');

//   const contacts = await res.json();
//   const total = res.headers.get('X-Total-Count'); // ✅ Total count header for pagination
//   const totalPages = Math.ceil(total / limit);

//   return {
//     contacts,
//     totalPages: totalPages || 1,
//   };
// };

// export const updateContact = async (id, data) => {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const createContact = async (data) => {
//   const res = await fetch(API_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };


// export const deleteContact = async (id) => {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE'
//   });
//   return res.json();
// };

// export const toggleFavourite = async (contact) => {
//   return updateContact(contact.id, { ...contact, favourite: !contact.favourite });
// };


// =======================================================================================================

const API_URL = 'http://localhost:3001/contacts'; // json-server base



export const fetchContacts = async (page = 1, search = '', favouritesOnly = false) => {
  const limit = 3; // ✅ Change to desired rows per page

  const params = new URLSearchParams({
    _page: page,
    _limit: limit,
    ...(search && { name_like: search }),
    ...(favouritesOnly && { favourite: true }),
  });

  const res = await fetch(`${API_URL}?${params}`, {
    headers: {
      Accept: 'application/json',
    },
  });


  console.log("==========================>", res);

  if (!res.ok) throw new Error('Error fetching contacts');
  const contacts = await res.json();
  const totalCount = res.headers.get('X-Total-Count'); // 👈 GET THE TOTAL COUNT HERE
  const totalPages = Math.ceil(totalCount / limit);
  return {
    contacts,
    totalPages,
  };
};














// ✅ Create Contact
export const createContact = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create contact');
  return res.json();
};

// ✅ Update Contact
export const updateContact = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update contact');
  return res.json();
};

// ✅ Delete Contact
export const deleteContact = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete contact');
  return res.json();
};

// ✅ Toggle Favourite Status
export const toggleFavourite = async (contact) => {
  return updateContact(contact.id, { ...contact, favourite: !contact.favourite });
};
