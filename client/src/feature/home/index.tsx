import SearchWrapper from './components/SearchWrapper';

import CourseCard from './components/CourseItem';
import GridLayout from '../../components/GridLayout';
import { useBookList } from '../../api';
import { useQueryParams } from './common';
import { Pagination } from '@material-ui/lab';
import { Button, useTheme } from '@material-ui/core';
import NavService from '../../services/Nav.service';
import RoutesConfig from '../../config/routesConfig';
type Props = {};

const HomePage = (props: Props) => {
  const query = useQueryParams();
  const theme = useTheme();
  const nav = new NavService();
  const { data } = useBookList({
    filtering: {
      page: `${query.page}`,
      pageSize: `${query.pageSize}`,
      sortField: 'pubYear',
      order: query.orderType as 'asc' | 'desc'
    }
  });
  return (
    <>
      <SearchWrapper />
      <GridLayout
        spacing={2}
        elements={
          (data?.books ?? []).map((item) => ({
            id: item.id,
            size: 4,
            sm: 6,
            xs: 12,
            element: (
              <CourseCard
                imageUrl="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                title={item.title}
                author={item.author}
                pubYear={item.pubYear ? item.pubYear : 'N/A'}
                videoCount={1}
                studentCount={1}
              />
            )
          })) as any
        }
      />
      <Pagination
        className="mt-24"
        classes={{
          ul: 'gap-11'
        }}
        hideNextButton
        hidePrevButton
        count={
          data?.paging?.total > data?.paging?.pageSize
            ? data?.paging?.total / data?.paging?.pageSize
            : 1
        }
        page={query.page + 1}
        variant="outlined"
        shape="rounded"
        onChange={(event, page) => {
          nav.redirectUser(
            RoutesConfig.HomePage.path({
              ...query,
              page: page - 1
            })
          );
        }}
        renderItem={(props) => {
          const { color, page, shape, type, ..._props } = props;
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            return (
              <Button
                disabled
                style={{ minWidth: '40px', height: '40px', padding: 0, alignItems: 'flex-end' }}
                {..._props}
                variant="text"
                disableRipple
                className="hover:bg-transparent"
              >
                ...
              </Button>
            );
          }
          return (
            <Button
              style={{
                minWidth: '40px',
                height: '40px',
                padding: 0,
                fontSize: 20,
                ...(_props.selected
                  ? { background: theme.palette.secondary.main, color: 'white' }
                  : {
                      background: theme.palette.grey[200],
                      color: theme.palette.grey[600]
                    }),
                border: 'none'
              }}
              {..._props}
            >
              {page}
            </Button>
          );
        }}
      />
    </>
  );
};

export default HomePage;
