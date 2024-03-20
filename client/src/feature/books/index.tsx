import { Box } from '@material-ui/core';
import PageContent from '../../components/PageContent';
import AddEditBookModal from './components/AddEditBookModal';
import BookList from './components/BookList';
type Props = {};

const Book = (props: Props) => {
  return (
    <PageContent>
      <AddEditBookModal />
      <Box
        className="pt-8 md:pt-18 pb-20 md:pb-30 px-5 md:px-12 lg:px-20"
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <BookList />
      </Box>
    </PageContent>
  );
};

export default Book;
