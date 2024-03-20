module.exports = (sequelize: any, DataTypes: any) => {
  const books = sequelize.define(
    'books',
    {
      title: DataTypes.STRING,
      pubYear: DataTypes.DATE,
      authorId: {
        type: DataTypes.INTEGER,
        reference: {
          model: 'authors',
          key: 'id'
        }
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE }
    },
    {}
  );
  books.associate = (models: any) => {};
  return books;
};
