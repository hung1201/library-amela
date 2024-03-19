import React from 'react';
import { useMenuIsVisible, useFieldsMenuDispatcher } from '../../provider';
import { IFilteringData, IProps } from '../../configuration';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import FilterListOutlined from '@material-ui/icons/FilterListOutlined';

interface ITableTitleContainerProps {
  title?: IProps<any>['title'];
  filteringPlaceholder?: string;
  handleFiltering?: (resetForm: boolean) => void;
  filteringData: {
    current: IFilteringData;
  };
  globalSearchDefaultValue?: string;
  isList: boolean;
  resetFilteringAction: IProps<any>['resetFilteringAction'];
}

const TableTitleContainer = (props: ITableTitleContainerProps) => {
  const setMenuVisible = useFieldsMenuDispatcher();
  const menuIsVisible = useMenuIsVisible();

  const searchWrapper = (textFieldProps?: Partial<TextFieldProps>) => (
    <TextFieldWrapper
      textFieldProps={textFieldProps}
      handleFiltering={props.handleFiltering}
      filteringData={props.filteringData}
      filteringPlaceholder={props.filteringPlaceholder}
      globalSearchDefaultValue={props.globalSearchDefaultValue}
    />
  );

  const handleFiltering = () => {
    const visibility = !menuIsVisible;
    if (!visibility) {
      props.filteringData.current = {};
      props.filteringData.current.__globalValue = null;
    }
    setMenuVisible(visibility);
  };
  const theme = useTheme();
  if (typeof props.title === 'function') {
    return (
      <>
        {props.title({
          handleFiltering,
          globalSearchTextInput: (props) => searchWrapper(props),
          isList: props.isList,
          handleReset: props.resetFilteringAction,
          filtersIsEnabled: menuIsVisible
        })}
      </>
    );
  }

  return (
    <Box
      sx={{
        padding: '0.3rem 0.5rem 0.3rem 0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ maxWidth: '85%' }}>
        <Typography
          style={{
            flex: '1 1 100%'
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.title}
        </Typography>
      </div>
      {props.filteringPlaceholder && (
        <Box
          sx={{
            flex: 1,
            padding: '10px',
            display: 'flex',
            maxWidth: '50%',
            [theme.breakpoints.down('sm')]: {
              display: 'none'
            }
          }}
        >
          {searchWrapper()}
        </Box>
      )}
      <div>
        <Tooltip title="Open filtering menu">
          <IconButton onClick={handleFiltering} aria-label="filter list">
            <FilterListOutlined />
          </IconButton>
        </Tooltip>
      </div>

      {props.filteringPlaceholder && (
        <Box
          sx={{
            display: 'none',
            width: '100%',
            [theme.breakpoints.down('sm')]: { display: 'block' }
          }}
        >
          <div
            style={{
              flex: 1,
              paddingTop: 10,
              paddingLeft: '1rem',
              paddingRight: '1rem',
              display: 'flex',
              width: '100%'
            }}
          >
            {searchWrapper}
          </div>
        </Box>
      )}
    </Box>
  );
};

interface ITextFieldWrapperProps {
  filteringData: ITableTitleContainerProps['filteringData'];
  handleFiltering?: ITableTitleContainerProps['handleFiltering'];
  filteringPlaceholder: ITableTitleContainerProps['filteringPlaceholder'];
  globalSearchDefaultValue: ITableTitleContainerProps['globalSearchDefaultValue'];
  textFieldProps?: Partial<TextFieldProps>;
}

const TextFieldWrapper = (props: ITextFieldWrapperProps) => {
  const [value, setValue] = React.useState<string | undefined>(props.globalSearchDefaultValue);
  const [debouncedValue, setDebouncedValue] = React.useState<string | undefined>(value);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(debouncedValue), 500);
    return () => clearTimeout(timer);
  }, [debouncedValue]);

  React.useEffect(() => {
    props.filteringData.current.__globalValue = value;
    props.handleFiltering && props.handleFiltering(false);
  }, [value]);

  return (
    <TextField
      id="search"
      placeholder={props.filteringPlaceholder}
      fullWidth
      variant={matches ? 'outlined' : 'standard'}
      value={debouncedValue || ''}
      onChange={(event) => setDebouncedValue(event.target.value)}
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => props.handleFiltering && props.handleFiltering(false)}>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props.textFieldProps}
    />
  );
};

export default React.memo(TableTitleContainer);
