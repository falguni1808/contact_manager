import { create } from 'zustand';

export const useContactStore = create((set) => ({
  selectedContact: null,
  showFavouritesOnly: false,

  setSelectedContact: (contact) => set({ selectedContact: contact }),
  clearSelectedContact: () => set({ selectedContact: null }),

  toggleFavouritesOnly: () =>
    set((state) => ({ showFavouritesOnly: !state.showFavouritesOnly })),

  editContactData: null,
  setEditContactData: (contact) => set({ editContactData: contact }),
  clearEditContactData: () => set({ editContactData: null }),
}));
