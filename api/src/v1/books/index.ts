import { Router } from 'express';
const router = Router();

import * as errors from '../../helpers/error';
import { verifyToken } from '../../middleware/auth';
import { Books } from '../../services/Books';
import { IInsertBookInput } from '../../types/books';
import * as validation from '../../helpers/requestSchemaValidation';
import { addBookSchema, editBookSchema, listBookSchema } from './schema';

router.post(
  '/list',
  verifyToken(),
  validation.requestSchemaValidation(listBookSchema, 'query'),
  (req, res) => {
    const auth = new Books();
    auth
      .getBook(req.query)
      .then((result) => {
        return res.send({
          success: true,
          books: result.books,
          paging: result.paging
        });
      })
      .catch((err: any) => {
        return errors.errorHandler(res, err.message, null);
      });
  }
);
router.post(
  '/add',
  verifyToken(),
  validation.requestSchemaValidation(addBookSchema),
  (req, res) => {
    const { title, pubYear, authorId } = req.body as IInsertBookInput;
    const books = new Books();

    books
      .createBook({
        title,
        pubYear,
        authorId
      })
      .then(() => {
        return res.send({
          success: true,
          message: 'Book added successfully.'
        });
      })
      .catch((err: any) => {
        return errors.errorHandler(res, err.message, null);
      });
  }
);

router
  .post('/details/:id', verifyToken(), (req, res) => {
    const auth = new Books();
    const id = req.params.id;
    auth
      .getDetails(id)
      .then((book: any) => {
        return res.send({
          success: true,
          book
        });
      })
      .catch((err: any) => {
        return errors.errorHandler(res, err.message, null);
      });
  })
  .patch(
    '/details/:id',
    verifyToken(),
    validation.requestSchemaValidation(editBookSchema),
    (req, res) => {
      const auth = new Books();
      const id = req.params.id;
      auth
        .updateBook(id, { ...req.body })
        .then(() => {
          return res.send({
            success: true,
            message: 'Book updated successfully.'
          });
        })
        .catch((err: any) => {
          return errors.errorHandler(res, err.message, null);
        });
    }
  )
  .delete('/details/:id', verifyToken(), (req, res) => {
    const auth = new Books();
    const id = req.params.id;
    auth
      .deleteBook(id)
      .then(() => {
        return res.send({
          success: true,
          message: 'Book deleted successfully.'
        });
      })
      .catch((err: any) => {
        return errors.errorHandler(res, err.message, null);
      });
  });
router.use(verifyToken());

router.post('/protected', (req, res) => {
  res.send({
    success: true
  });
});
module.exports = router;
