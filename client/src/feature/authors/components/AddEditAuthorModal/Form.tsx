import { Field, Formik, Form as FormikForm, FormikProps } from 'formik';
import { useEffect } from 'react';
import { AddEditAuthorModalParams } from '.';
import { useAuthorList, useBookList } from '../../../../api';
import { ModalIDs } from '../../../../config/modalsConfig';
import { useModalAction } from '../../../../services/ModalProvider';
import { IAuthorModels } from '../../../../types/authors.types';
import { useAddAuthor, useEditAuthor } from '../../api';
import { Chip, Input, MenuItem, Select, useTheme } from '@material-ui/core';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const Form = (props: AddEditAuthorModalParams) => {
  const theme = useTheme();
  const { close } = useModalAction();
  const { refetch } = useAuthorList({ enabled: false });
  const { data: books } = useBookList({
    filtering: {
      page: `0`,
      pageSize: `${Number.MAX_SAFE_INTEGER}`
    }
  });
  const { mutate: edit, isLoading: isEditing } = useEditAuthor({
    onSuccess() {
      close(ModalIDs.ADD_EDIT_AUTHOR_MODAL);
      refetch();
    }
  });
  const { mutate: add, isLoading: isAdding } = useAddAuthor({
    onSuccess() {
      close(ModalIDs.ADD_EDIT_AUTHOR_MODAL);
      refetch();
    }
  });

  return (
    <Formik
      validate={(values) => {
        const errors = { name: '', bookIds: '' };
        if (!values.name) {
          errors.name = 'Required';
        }
        const checkErrorsEmpty = Object.values(errors).filter((x) => x);
        if (checkErrorsEmpty.length > 0) {
          return errors;
        }
      }}
      initialValues={
        props?.data?.id
          ? {
              name: props.data.name ?? '',
              bookIds: props.data.bookIds ?? []
            }
          : {
              name: '',
              bookIds: []
            }
      }
      onSubmit={(
        values: Omit<IAuthorModels, 'id'>,
        { setSubmitting }: FormikProps<Omit<IAuthorModels, 'id'>>
      ) => {
        if (props?.data?.id) {
          edit({
            id: props.data.id,
            body: { ...values }
          });
          return;
        }
        add({ ...values });
      }}
      render={({ errors, touched, ...props }) => (
        <FormikForm autoComplete="new-password">
          <div
            className={`justify-center items-start px-8 py-7 mt-6 rounded-lg border-2 border-solid ${
              errors.name && touched.name ? 'border-red-500' : 'border-black border-opacity-10'
            } max-md:px-5 max-md:mt-10 max-md:max-w-full`}
          >
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              aria-label="Name"
              className="w-full bg-transparent focus:outline-none "
              autoComplete="new-password"
            />
          </div>
          {errors.name && touched.name ? <div className="text-red-500">{errors.name}</div> : null}
          <div className="justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid border-black border-opacity-10 max-md:px-5 max-md:max-w-full">
            <label htmlFor="password" className="sr-only">
              Book
            </label>
            <Field
              id="bookIds"
              name="bookIds"
              aria-label="Book"
              placeholder="Book"
              className="w-full bg-transparent focus:outline-none "
              autoComplete="new-password"
              style={{ backgroundColor: 'transparent' }}
              render={(fieldProps: any) => (
                <Select
                  placeholder="Book"
                  multiple
                  value={props?.values['bookIds'] ?? []}
                  onChange={(event) => props.setFieldValue('bookIds', event.target.value)}
                  input={
                    <Input id="select-multiple-chip" disableUnderline={true} placeholder="Book" />
                  }
                  renderValue={(selected: any[]) => {
                    if (selected.length === 0) {
                      return <></>;
                    }
                    return (
                      <div className="flex flex-wrap gap-1">
                        {(selected ?? []).map((value) => (
                          <Chip
                            key={value}
                            label={books?.books?.find((book) => book.id === value)?.title}
                          />
                        ))}
                      </div>
                    );
                  }}
                  MenuProps={MenuProps}
                  className="w-full"
                >
                  <MenuItem disabled value="">
                    <em>Books</em>
                  </MenuItem>
                  {(books?.books ?? []).map((name) => (
                    <MenuItem key={name.id} value={name.id}>
                      {name.title}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <button
            type="submit"
            className="justify-center items-center px-2 py-3 mt-10 text-lg font-bold tracking-normal text-gray-800 bg-amber-200 rounded-md max-md:px-5 w-full"
            style={{ background: theme.palette.secondary.main, letterSpacing: 4 }}
          >
            Save
          </button>
        </FormikForm>
      )}
    />
  );
};

export default Form;
