const API_URL = 'http://localhost:3001/contacts'; 


// Create Contact
export const createContact = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create contact');
  return res.json();
};

export const fetchContacts = async (page = 1, search = '', favouritesOnly = false) => {
  const limit = 10;

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

  if (!res.ok) throw new Error('Error fetching contacts');
  const contacts = await res.json();
  const totalCount = res.headers.get('X-Total-Count');
  const totalPages = Math.ceil(totalCount / limit);
  return {
    contacts,
    totalPages,
  };
};

// Update Contact
export const updateContact = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update contact');
  return res.json();
};

//  Delete Contact
export const deleteContact = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete contact');
  return res.json();
};

//  Toggle Favourite Status
export const toggleFavourite = async (contact) => {
  return updateContact(contact.id, { ...contact, favourite: !contact.favourite });
};
