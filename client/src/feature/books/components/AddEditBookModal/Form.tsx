import React, { useEffect } from 'react';
import { AddEditBookModalParams } from '.';
import { Formik, FormikProps, Form as FormikForm, Field, useFormik } from 'formik';
import { IBookModels } from '../../../../types/books.types';
import FetchService from '../../../../services/Fetch.service';
import { useModalAction } from '../../../../services/ModalProvider';
import { ModalIDs } from '../../../../config/modalsConfig';
import { useAuthorList, useBookList } from '../../../../api';
import moment from 'moment';
import { useAddBook, useEditBook } from '../../api';
import { Chip, IconButton, Input, MenuItem, Select } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
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
const Form = (props: AddEditBookModalParams) => {
  const { close } = useModalAction();
  const { refetch } = useBookList({ enabled: false });
  const { data: authors } = useAuthorList({
    filtering: {
      page: `0`,
      pageSize: `${Number.MAX_SAFE_INTEGER}`
    }
  });
  const { mutate: edit, isLoading: isEditing } = useEditBook({
    onSuccess() {
      close(ModalIDs.ADD_EDIT_BOOK_MODAL);
      refetch();
    }
  });
  const { mutate: add, isLoading: isAdding } = useAddBook({
    onSuccess() {
      close(ModalIDs.ADD_EDIT_BOOK_MODAL);
      refetch();
    }
  });
  useEffect(() => {
    if (props?.data?.id) {
    }
  }, []);

  return (
    <Formik
      initialValues={
        props?.data?.id
          ? {
              title: props.data.title ?? '',
              pubYear: moment(props.data.pubYear).format('YYYY-MM-DD') ?? '',
              authorId: props.data.authorId ?? ''
            }
          : {
              title: '',
              pubYear: '',
              authorId: ''
            }
      }
      onSubmit={(
        values: Omit<IBookModels, 'id'>,
        { setSubmitting }: FormikProps<Omit<IBookModels, 'id'>>
      ) => {
        if (props?.data?.id) {
          edit({
            id: props.data.id,
            body: { ...values, authorId: values.authorId ? values.authorId : undefined }
          });
          return;
        }
        add({ ...values, authorId: values.authorId ? values.authorId : undefined });
      }}
      render={(props) => (
        <FormikForm autoComplete="off">
          <div className="justify-center items-start px-8 py-7 mt-6 rounded-lg border-2 border-solid border-black border-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <label htmlFor="name" className="sr-only">
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              aria-label="Title"
              className="w-full bg-transparent focus:outline-none "
              autoComplete="off"
            />
          </div>
          <div className="justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid border-black border-opacity-10 max-md:px-5 max-md:max-w-full">
            <label htmlFor="email" className="sr-only">
              Publication Year
            </label>
            <Field
              type="date"
              id="pubYear"
              name="pubYear"
              placeholder="Publication Year"
              aria-label="Publication Year"
              className="w-full bg-transparent focus:outline-none "
              autoComplete="off"
            />
          </div>
          <div className="justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid border-black border-opacity-10 max-md:px-5 max-md:max-w-full">
            <label htmlFor="password" className="sr-only">
              Author
            </label>
            <Field
              id="authorId"
              name="authorId"
              aria-label="Author"
              placeholder="Author"
              className="w-full bg-transparent focus:outline-none "
              autoComplete="off"
              style={{ backgroundColor: 'transparent' }}
              render={(fieldProps: any) => (
                <Select
                  placeholder="Author"
                  value={props?.values['authorId'] ?? 0}
                  onChange={(event) => props.setFieldValue('authorId', event.target.value)}
                  input={
                    <Input
                      id="select-multiple-chip"
                      disableUnderline={true}
                      placeholder="Book"
                      endAdornment={
                        props.values['authorId'] ? (
                          <IconButton
                            size="small"
                            style={{ marginRight: 16 }}
                            onClick={() => props.setFieldValue('authorId', null)}
                          >
                            <CloseOutlined />
                          </IconButton>
                        ) : (
                          <></>
                        )
                      }
                    />
                  }
                  renderValue={(selected) => {
                    if (!selected) return;
                    return (
                      <div className="flex flex-wrap gap-1">
                        <Chip
                          label={
                            authors?.authors?.find((aut) => `${aut.id}` === `${selected}`)?.name
                          }
                        />
                      </div>
                    );
                  }}
                  MenuProps={MenuProps}
                  className="w-full"
                >
                  <MenuItem disabled value="">
                    <em>Author</em>
                  </MenuItem>
                  {(authors?.authors ?? []).map((it) => (
                    <MenuItem key={it.id} value={it.id}>
                      {it.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <button
            type="submit"
            className="justify-center items-center px-2 py-3 mt-10 text-lg font-bold tracking-normal text-gray-800 bg-amber-200 rounded-md max-md:px-5 w-full"
            style={{ background: '#FCD980', letterSpacing: 4 }}
          >
            Save
          </button>
        </FormikForm>
      )}
    />
  );
};

export default Form;
