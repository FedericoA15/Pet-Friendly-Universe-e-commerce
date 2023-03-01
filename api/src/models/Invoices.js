// modelo de factura de compra
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Invoices",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // la FK de user_id se genera aut por la relacion de sequelize

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // la FK de user_id se genera aut por la relacion de sequelize

      paymentId: {
        type: DataTypes.BIGINT,
      },

      merchantOrder: {
        type: DataTypes.BIGINT,
      },

      status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true, // son los tiempos de creacion y de act de la tabla de la base de datos, con esto eliminamos el tiempo de act
      createdAt: true,
      updatedAt: false,
    }
  );
};
