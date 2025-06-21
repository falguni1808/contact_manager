// 'use client';
// import { create } from 'zustand';

// export const useContactStore = create((set) => ({
//   selectedContact: null,
//   showFavouritesOnly: false,
//   setSelectedContact: (contact) => set({ selectedContact: contact }),
//   clearSelectedContact: () => set({ selectedContact: null }),
//   toggleFavouritesOnly: () => set((state) => ({ showFavouritesOnly: !state.showFavouritesOnly })),
// }));


import { create } from 'zustand';

export const useContactStore = create((set) => ({
  selectedContact: null,
  showFavouritesOnly: false,

  // SET and CLEAR selected contact for view or edit
  setSelectedContact: (contact) => set({ selectedContact: contact }),
  clearSelectedContact: () => set({ selectedContact: null }),

  toggleFavouritesOnly: () =>
    set((state) => ({ showFavouritesOnly: !state.showFavouritesOnly })),

  // ✅ NEW: TEMP store for Edit form (optional)
  editContactData: null,
  setEditContactData: (contact) => set({ editContactData: contact }),
  clearEditContactData: () => set({ editContactData: null }),
}));
