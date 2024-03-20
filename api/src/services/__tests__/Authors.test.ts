require('dotenv').config();
import { Authors } from '../Authors';
import db from '../../db/models';

describe('Authors Service', () => {
  let authorsService: Authors;
  let thisDb: any = db;
  beforeEach(async () => {
    authorsService = new Authors();
    await thisDb.sequelize.sync({ force: true });
  });

  it('should create an author', async () => {
    const author = await authorsService.createAuthor({ name: 'John Doe', bookIds: [] });
    expect(author).toBeDefined();
    expect(author.name).toBe('John Doe');
  });

  it('should get an author', async () => {
    const authorCreate = await authorsService.createAuthor({ name: 'John Doe', bookIds: [] });
    expect(authorCreate).toBeDefined();
    const author = await authorsService.getDetails(authorCreate.dataValues.id);
    expect(author).toBeDefined();
    expect(author.name).toBe('John Doe');
  });

  it('should get author details', async () => {
    const authorCreate = await authorsService.createAuthor({ name: 'John Doe', bookIds: [] });
    expect(authorCreate).toBeDefined();
    const authorDetails = await authorsService.getDetails(authorCreate.dataValues.id);
    expect(authorDetails).toBeDefined();
    expect(authorDetails.name).toBe('John Doe');
  });

  it('should delete an author', async () => {
    const authorCreate = await authorsService.createAuthor({ name: 'John Doe', bookIds: [] });
    expect(authorCreate).toBeDefined();
    const deletedAuthor = await authorsService.deleteAuthor(authorCreate.dataValues.id);
    expect(deletedAuthor).toEqual(1);
  });
  afterAll(async () => {
    await thisDb.sequelize.close();
  });
});
