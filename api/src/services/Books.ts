import { IFetchAllBookInput, IInsertBookInput } from 'types/books';
import db from '../db/models';

class Books {
  constructor() {}

  createBook(payload: IInsertBookInput) {
    return db.books.create({
      title: payload.title,
      pubYear: payload.pubYear,
      authorId: payload.authorId
    });
  }

  getBook(payload: IFetchAllBookInput) {
    return db.books.findAll({
      raw: true,
      where: {
        ...(payload.authorId ? { authorId: payload.authorId } : {})
      },
      attributes: ['title', 'pubYear', 'authorId']
    });
  }
  getDetails(id: string) {
    return db.books.findOne({
      raw: true,
      where: { id: id },
      attributes: ['title', 'pubYear', 'authorId']
    });
  }

  updateBook(id: string, updatedData: Partial<IInsertBookInput>) {
    return db.books.update(updatedData, {
      where: { id }
    });
  }

  deleteBook(id: string) {
    return db.books.destroy({
      where: { id }
    });
  }
}

export { Books };
