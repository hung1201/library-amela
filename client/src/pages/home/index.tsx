import { Box } from '@material-ui/core';
import PageContent from '../../components/PageContent';
import SearchWrapper from '../../components/SearchWrapper';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { NextPageWithLayout, withPageLayout } from '../../components/layout/LayoutContainers';

import CourseCard from '../../components/CourseItem';
import GridLayout from '../../components/GridLayout';
import withPageAuth from '../../middleware/withPageAuth';

interface IProps {
  action: string;
}

const Home: NextPageWithLayout = withPageAuth(
  () => {
    return (
      <PageContent>
        <Box
          className="pt-10 md:pt-32 pb-20 md:pb-44 px-5 md:px-12 lg:px-20"
          display={'flex'}
          sx={{
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <SearchWrapper />
          <GridLayout
            spacing={2}
            elements={[
              {
                id: '1',
                size: 4,
                sm: 6,
                xs: 12,
                element: (
                  <CourseCard
                    imageUrl="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                    title="Course 1 Course 1 Course 1"
                    description="lorem Course 1 Course 1 Course 1 Course 1 "
                    duration="1"
                    videoCount={1}
                    studentCount={1}
                  />
                )
              },
              {
                id: '2',
                size: 4,
                sm: 6,
                xs: 12,
                element: (
                  <CourseCard
                    imageUrl="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                    title="Course 1"
                    description="lorem"
                    duration="1"
                    videoCount={1}
                    studentCount={1}
                  />
                )
              },
              {
                id: '3',
                size: 4,
                sm: 6,
                xs: 12,
                element: (
                  <CourseCard
                    imageUrl="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                    title="Course 1"
                    description="lorem"
                    duration="1"
                    videoCount={1}
                    studentCount={1}
                  />
                )
              }
            ]}
          />
        </Box>
      </PageContent>
    );
  },
  {
    requiredAuth: true
  }
);
Home.getLayout = withPageLayout({
  FooterComponent: Footer,
  BaseHeaderComponent: () => (
    <Header
      path={{
        label: 'Kursus',
        href: ''
      }}
    />
  )
});
export default Home;
