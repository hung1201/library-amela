module.exports = (sequelize: any, DataTypes: any) => {
  const books = sequelize.define(
    'books',
    {
      pubYear: DataTypes.STRING,
      authorId: DataTypes.STRING,
      createdAt: DataTypes.STRING,
      updatedAt: DataTypes.STRING
    },
    {}
  );
  books.associate = (models: any) => {};
  return books;
};
