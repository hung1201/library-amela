module.exports = (sequelize: any, DataTypes: any) => {
  const authors = sequelize.define(
    'authors',
    {
      name: DataTypes.STRING,
      bookIds: DataTypes.STRING,
      createdAt: DataTypes.STRING,
      updatedAt: DataTypes.STRING
    },
    {}
  );
  authors.associate = (models: any) => {};
  return authors;
};
