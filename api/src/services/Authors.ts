import {
  IFetchAuthorListInput,
  IFetchAuthorListOutput,
  IInsertAuthorInput
} from '../types/authors';
import db, { sequelize } from '../db/models';

class Authors {
  constructor() {}

  createAuthor = async (payload: IInsertAuthorInput) => {
    const data = await db.authors.create({
      name: payload.name,
      bookIds: payload.bookIds ?? [],
      createdAt: new Date().toISOString()
    });
    if (payload.bookIds.length > 0) {
      await sequelize.query(
        `UPDATE books
        SET "authorId" = ${data.id}
        WHERE id = ANY(ARRAY[${payload.bookIds}]);
        `
      );
    }
    return data;
  };

  getAuthor = async (payload: IFetchAuthorListInput): Promise<IFetchAuthorListOutput> => {
    const [rows] = await sequelize.query(
      ` SELECT authors.*, json_agg(json_build_object('id', books.id, 'title', books.title)) AS books
        FROM authors 
        LEFT JOIN books ON books.id = ANY(authors."bookIds")
        GROUP BY authors.id
        ORDER BY ${payload.sortField} ${payload.order}
        LIMIT ${payload.pageSize}
        OFFSET ${Number(payload.page) * Number(payload.pageSize)};
      `
    );
    const [total] = await sequelize.query(
      ` SELECT COUNT(*) AS count
        FROM authors 
      `
    );

    return {
      authors: rows,
      paging: {
        total: Number(total[0]?.count ?? '0'),
        page: Number(payload.page),
        pageSize: Number(payload.pageSize)
      }
    };
  };
  getDetails(id: string) {
    return db.authors.findOne({
      raw: true,
      where: { id: id }
    });
  }

  updateAuthor = async (id: string, updatedData: Partial<IInsertAuthorInput>) => {
    const data = await db.authors.update(updatedData, {
      where: { id }
    });
    if (updatedData.bookIds?.length! === 0) {
      await sequelize.query(
        `UPDATE books
        SET "authorId" = NULL
        WHERE "authorId" = ${id};
        `
      );
    } else {
      await sequelize.query(
        `UPDATE books
        SET "authorId" = ${id}
        WHERE id = ANY(ARRAY[${updatedData.bookIds}]);
        `
      );
    }

    return data;
  };

  deleteAuthor(id: string) {
    return db.authors.destroy({
      where: { id }
    });
  }
}

export { Authors };
