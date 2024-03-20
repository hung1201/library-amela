require('dotenv').config();
import { Books } from '../Books';
import db from '../../db/models';

describe('Book Service', () => {
  let bookService: Books;
  let thisDb: any = db;
  beforeEach(async () => {
    bookService = new Books();
    await thisDb.sequelize.sync({ force: true });
  });

  it('should create an book', async () => {
    const book = await bookService.createBook({
      title: '1',
      pubYear: '2022-02-02',
      authorId: 1
    });
    expect(book).toBeDefined();
    expect(book.title).toBe(`1`);
  });

  it('should get an book', async () => {
    const bookCreate = await bookService.createBook({
      title: '1',
      pubYear: '2022-02-02',
      authorId: 1
    });
    expect(bookCreate).toBeDefined();
    const book = await bookService.getDetails(bookCreate.dataValues.id);
    expect(book).toBeDefined();
    expect(book.title).toBe(`1`);
  });

  it('should get book details', async () => {
    const bookCreate = await bookService.createBook({
      title: '1',
      pubYear: '2022-02-02',
      authorId: 1
    });
    expect(bookCreate).toBeDefined();
    const bookDetails = await bookService.getDetails(bookCreate.dataValues.id);
    expect(bookDetails).toBeDefined();
    expect(bookDetails.title).toBe(`1`);
  });

  it('should delete an book', async () => {
    const bookCreate = await bookService.createBook({
      title: '1',
      pubYear: '2022-02-02',
      authorId: 1
    });
    expect(bookCreate).toBeDefined();
    const deletedBook = await bookService.deleteBook(bookCreate.dataValues.id);
    expect(deletedBook).toEqual(1);
  });
  afterAll(async () => {
    await thisDb.sequelize.close();
  });
});
