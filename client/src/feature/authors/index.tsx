import { Box } from '@material-ui/core';
import PageContent from '../../components/PageContent';
import AddEditAuthorModal from './components/AddEditAuthorModal';
import AuthorList from './components/AuthorList';
type Props = {};

const Author = (props: Props) => {
  return (
    <PageContent>
      <AddEditAuthorModal />
      <Box
        className="pt-8 md:pt-18 pb-20 md:pb-30 px-5 md:px-12 lg:px-20"
        display={'flex'}
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <AuthorList />
      </Box>
    </PageContent>
  );
};

export default Author;
