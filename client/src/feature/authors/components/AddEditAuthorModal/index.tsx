import BaseModal from '../../../../components/BaseModal';
import { ModalIDs } from '../../../../config/modalsConfig';
import { IAuthorModels } from '../../../../types/authors.types';
import Form from './Form';

export type AddEditAuthorModalParams = {
  data?: IAuthorModels;
};

const AddEditAuthorModal = (props: AddEditAuthorModalParams) => {
  return (
    <BaseModal
      modalProps={{
        maxWidth: 'sm',
        fullWidth: true,
        PaperProps: {}
      }}
      modalID={ModalIDs.ADD_EDIT_AUTHOR_MODAL}
      renderHeader={(params: AddEditAuthorModalParams) => (
        <div className="p-2 flex items-center">
          {params?.data?.id ? 'Edit Author' : 'Add Author'}
        </div>
      )}
      renderContent={(params: AddEditAuthorModalParams) => <Form {...params} />}
    />
  );
};

export default AddEditAuthorModal;
