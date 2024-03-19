// Define the const object
export const ModalIDs = {
  TOAST: 'TOAST',
  ADD_EDIT_BOOK_MODAL: 'ADD_EDIT_BOOK_MODAL',
  ADD_EDIT_AUTHOR_MODAL: 'ADD_EDIT_AUTHOR_MODAL',
  MODAL_VERIFY_ACTION: 'MODAL_VERIFY_ACTION'
} as const;

export type IModalIDs = typeof ModalIDs;
