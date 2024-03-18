import db from '../db/models';

class Authors {
  public name: string;
  public bookIds: number[];

  constructor(name: string, bookIds: number[]) {
    this.name = name;
    this.bookIds = bookIds;
  }

  createAuthor() {
    return db.authors.create({
      name: this.name,
      bookIds: this.bookIds
    });
  }

  getAuthor(authorId: number) {
    return db.authors.findOne({
      raw: true,
      where: { id: authorId },
      attributes: ['name', 'bookIds']
    });
  }

  updateAuthor(authorId: number, updatedData: Partial<Authors>) {
    return db.authors.update(updatedData, {
      where: { id: authorId }
    });
  }

  deleteAuthor(authorId: number) {
    return db.authors.destroy({
      where: { id: authorId }
    });
  }
}

export { Authors };
