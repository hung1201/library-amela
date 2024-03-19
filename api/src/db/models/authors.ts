module.exports = (sequelize: any, DataTypes: any) => {
  const authors = sequelize.define(
    'authors',
    {
      name: DataTypes.STRING,
      bookIds: DataTypes.ARRAY(DataTypes.INTEGER),
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE }
    },
    {}
  );
  authors.associate = (models: any) => {};
  return authors;
};
