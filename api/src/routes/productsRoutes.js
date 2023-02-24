const { Router } = require("express");
const {
  postProductHandler,
  getAllProductsHandler,
  getProductByIDlHandler,
  getFilters,
  putProductHandler,
  deleteProductHandler,
} = require("../handler/productsHandler");
const productsRoutes = Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const authMiddleware = require("../helpers/authMiddleware");

productsRoutes.get("/", getAllProductsHandler);
productsRoutes.get("/filters", getFilters);
productsRoutes.get("/:id", getProductByIDlHandler);
productsRoutes.post("/create", upload.single("img"), postProductHandler);
productsRoutes.put("/:id", putProductHandler);
productsRoutes.delete("/:id", deleteProductHandler);

module.exports = productsRoutes;
