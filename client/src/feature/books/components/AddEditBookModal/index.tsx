import React from 'react';
import BaseModal from '../../../../components/BaseModal';
import { ModalIDs } from '../../../../config/modalsConfig';
import { IBookModels, IFetchBookListInput } from '../../../../types/books.types';
import Form from './Form';

export type AddEditBookModalParams = {
  data?: IBookModels;
};

const AddEditBookModal = (props: AddEditBookModalParams) => {
  return (
    <BaseModal
      modalProps={{
        maxWidth: 'sm',
        fullWidth: true,
        PaperProps: {}
      }}
      modalID={ModalIDs.ADD_EDIT_BOOK_MODAL}
      renderHeader={(params: AddEditBookModalParams) => (
        <div className="p-2 flex items-center">{params?.data?.id ? 'Edit Book' : 'Add Book'}</div>
      )}
      renderContent={(params: AddEditBookModalParams) => <Form {...params} />}
    />
  );
};

export default AddEditBookModal;
