'use strict';
module.exports = {
  up: (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      pubYear: {
        type: Sequelize.DATE
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'authors',
          key: 'id'
        },
        onDelete: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.dropTable('books');
  }
};
