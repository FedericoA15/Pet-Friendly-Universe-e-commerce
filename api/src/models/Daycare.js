const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Daycare",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      area_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      locality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zip_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      street_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 30],
        },
      },
      street_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 2000],
        },
      },
      img: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 500],
        },
      },
      mail: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 50],
        },
      },
      qualification: {
        type: DataTypes.FLOAT,
      },
      price_hour: {
        type: DataTypes.INTEGER,
      },
      price_day: {
        type: DataTypes.INTEGER,
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { updatedAt: false }
  );
};
