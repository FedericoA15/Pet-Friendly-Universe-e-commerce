const { Op, Sequelize, QueryTypes } = require("sequelize");
const {
  sequelize,
  Review,
  Product,
  Store,
  Brands,
  Breeds,
  Species,
  Colors,
  Weights,
} = require("../db");

const getAllProducts = async () => {
  const products = await Product.findAll({
    attributes: ["id", "name", "price", "img", "weight", "brand", "stock"],
    where: {
      enabled: true,
    },
  });
  const priceRange = {
    min: Math.floor((await Product.min("price")) / 50) * 50,
    max: Math.ceil((await Product.max("price")) / 50) * 50,
  };
  return { products, priceRange };
};

const getProductFilter = async (query) => {
  query.attributes = ["id", "name", "price", "img", "weight", "brand", "stock"];
  if (!!query.where?.name) {
    query.where.name = { [Op.iLike]: `%${query.where.name}%` };
  }
  if (!!query?.pricesBetween) {
    query.where = {
      ...query.where,
      price: { [Op.between]: query.pricesBetween },
    };
    delete query.pricesBetween;
  }
  // Agregar condición para "enable" igual a true
  if (!query.where) query.where = {};
  query.where.enabled = true;

  const products = await Product.findAll(query);
  const maxPrice = await Product.findAll({
    attributes: [[Sequelize.fn("max", Sequelize.col("price")), "max_price"]],
    where: query.where,
  });
  const minPrice = await Product.findAll({
    attributes: [[Sequelize.fn("min", Sequelize.col("price")), "min_price"]],
    where: query.where,
  });
  const priceRange = {
    min: Math.floor(minPrice[0].dataValues.min_price / 50) * 50,
    max: Math.ceil(maxPrice[0].dataValues.max_price / 50) * 50,
  };
  return { products, priceRange };
};
const getProductByID = async (id) => {
  const product = await Product.findByPk(id);
  const comments = await sequelize.query(
    `select u.name as "user", r.comment as "comment", r."createdAt" as date
     from "Reviews" as r
     inner join "Users" as u
     on r."UserId"=u."id"
     where "ProductId"=${id};`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const qualification = await sequelize.query(
    `select AVG(qualification) from "Reviews" where "ProductId"=${id};`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return { product, qualification, comments };
};
// color, peso, imagen, tamaño  => extra
const createProduct = async (requiredData, extraData) => {
  await Brands.findOrCreate({
    where: { id: requiredData.brand },
  });
  await Breeds.findOrCreate({
    where: { id: requiredData.breed },
  });
  await Species.findOrCreate({
    where: { id: requiredData.specie },
  });
  await Weights.findOrCreate({
    where: { id: extraData.weight },
  });
  if (extraData?.color)
    await Colors.findOrCreate({
      where: { id: extraData.color },
    });
  const store = Store.findByPk(requiredData.storeId);
  if (!store) {
    throw new Error("Store doesnt exist");
  }
  if (!Object.values(requiredData).every((value) => value)) {
    throw new Error("Missing data");
  } else {
    const newProduct = await Product.create({
      StoreId: requiredData.storeId,
      ...requiredData,
      ...extraData,
    });
    return newProduct;
  }
};

const updateProduct = async (id, data) => {
  if (!Object.values(data).every((value) => value)) {
    throw new Error("Missing data");
  } else {
    await Product.update(
      { ...data },
      {
        where: { id: id },
      }
    );
    const editedProduct = await Product.findByPk(id);
    return editedProduct;
  }
};

const deleteProduct = async (id) => {
  const productDeleted = await Product.update(
    { enabled: false },
    {
      where: {
        id,
      },
    }
  );
  return productDeleted;
};

const getFiltersBD = async () => {
  const filters = []; // [{colors:["blue","red"]}]
  filters.push(["Breeds", await Breeds.findAll()]);
  filters.push(["Brands", await Brands.findAll()]);
  filters.push(["Species", await Species.findAll()]);
  // filters.push({ Colors: await Colors.findAll() });  // pendiente

  return filters;
};

const getProductsByStore = async (storeId) => {
  const products = await Product.findAll({
    where: {
      StoreId: storeId,
      enabled: true,
    },
  });
  return products;
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductFilter,
  getFiltersBD,
  getProductsByStore,
};
