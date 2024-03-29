module.exports = (sequelize: any, DataTypes: any) => {
  const users = sequelize.define(
    'users',
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      refreshToken: DataTypes.STRING
    },
    {}
  );
  users.associate = (models: any) => {
    // associations can be defined here
  };
  return users;
};
