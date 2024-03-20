import { Router } from 'express';
const router = Router();

import * as errors from '../../helpers/error';
import { verifyToken } from '../../middleware/auth';
import { Authors } from '../../services/Authors';
import * as validation from '../../helpers/requestSchemaValidation';
import { addAuthorSchema, editAuthorSchema, listAuthorSchema } from './schema';

router.post(
  '/list',
  verifyToken(),
  validation.requestSchemaValidation(listAuthorSchema, 'query'),
  (req, res) => {
    const auth = new Authors();
    auth
      .getAuthor(req.query)
      .then((result) => {
        return res.send({
          success: true,
          authors: result.authors,
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
  validation.requestSchemaValidation(addAuthorSchema),
  (req, res) => {
    const authors = new Authors();
    authors
      .createAuthor({
        ...req.body
      })
      .then(() => {
        return res.send({
          success: true,
          message: 'Author added successfully.'
        });
      })
      .catch((err: any) => {
        return errors.errorHandler(res, err.message, null);
      });
  }
);

router
  .post('/details/:id', verifyToken(), (req, res) => {
    const auth = new Authors();
    const id = req.params.id;
    auth
      .getDetails(id)
      .then((author: any) => {
        return res.send({
          success: true,
          author
        });
      })
      .catch((err: any) => {
        return errors.errorHandler(res, err.message, null);
      });
  })
  .patch(
    '/details/:id',
    verifyToken(),
    validation.requestSchemaValidation(editAuthorSchema),
    (req, res) => {
      const auth = new Authors();
      const id = req.params.id;
      auth
        .updateAuthor(id, { ...req.body })
        .then(() => {
          return res.send({
            success: true,
            message: 'Author updated successfully.'
          });
        })
        .catch((err: any) => {
          return errors.errorHandler(res, err.message, null);
        });
    }
  )
  .delete('/details/:id', verifyToken(), (req, res) => {
    const auth = new Authors();
    const id = req.params.id;
    auth
      .deleteAuthor(id)
      .then(() => {
        return res.send({
          success: true,
          message: 'Author deleted successfully.'
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
