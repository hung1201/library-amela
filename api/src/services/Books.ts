import { IFetchBookListInput, IFetchBookListOutput, IInsertBookInput } from 'types/books';
import db, { sequelize } from '../db/models';

class Books {
  constructor() {}

  createBook = async (payload: IInsertBookInput) => {
    const data = await db.books.create({
      title: payload.title,
      pubYear: payload.pubYear,
      authorId: payload.authorId,
      createdAt: new Date().toISOString()
    });
    if (payload.authorId) {
      await sequelize.query(
        `UPDATE authors
        SET "bookIds" = array_append("bookIds", ${data.id})
        WHERE id = ${payload.authorId};
        `
      );
    }
    return data;
  };

  getBook = async (payload: IFetchBookListInput): Promise<IFetchBookListOutput> => {
    const [rows] = await sequelize.query(
      ` SELECT books.*, authors.name AS author
        FROM books 
        LEFT JOIN authors ON books."authorId" = authors."id"
        ${payload.title ? `WHERE books.title ILIKE '%${payload.title}%'` : ''}
        ORDER BY "${payload.sortField}" ${payload.order}
        LIMIT ${payload.pageSize}
        OFFSET ${Number(payload.page) * Number(payload.pageSize)};
      `
    );
    const [total] = await sequelize.query(
      ` SELECT books.*
        FROM books 
      `
    );

    return {
      books: rows,
      paging: {
        total: Number(total[0]?.count ?? '0'),
        page: Number(payload.page),
        pageSize: Number(payload.pageSize)
      }
    };
  };
  getDetails(id: string) {
    return db.books.findOne({
      raw: true,
      where: { id: id },
      attributes: ['title', 'pubYear', 'authorId']
    });
  }

  updateBook = async (id: string, updatedData: Partial<IInsertBookInput>) => {
    const data = await db.books.update(
      {
        ...updatedData,
        authorId: updatedData.authorId ?? null,
        updatedAt: new Date().toISOString()
      },
      {
        where: { id }
      }
    );
    if (!updatedData.authorId) {
      await sequelize.query(
        `UPDATE authors
        SET "bookIds" = array_remove("bookIds", ${id})
        WHERE id = (SELECT "authorId" FROM books WHERE id = ${id});
        `
      );
    } else {
      await sequelize.query(
        `UPDATE authors
        SET "bookIds" = array_remove("bookIds", ${id})
        WHERE id = (SELECT "authorId" FROM books WHERE id = ${id});
        `
      );
      await sequelize.query(
        `UPDATE authors
        SET "bookIds" = array_append("bookIds", ${id})
        WHERE id = ${updatedData.authorId};
        `
      );
    }
    return data;
  };

  deleteBook(id: string) {
    return db.books.destroy({
      where: { id }
    });
  }
}

export { Books };
