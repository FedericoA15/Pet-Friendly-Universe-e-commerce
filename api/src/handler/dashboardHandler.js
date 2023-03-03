const {
  getUser,
  getStore,
  getWalker,
  getDaycare,
  getProducts,
  getUserFilter,
  getEarningsByInvoices,
  getEarningsByInvoiceStore,
} = require("../controllers/dashboardController");

const getCountUser = async (req, res) => {
  try {
    const countUser = await getUser();
    return res.status(200).json(countUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getCountStore = async (req, res) => {
  try {
    const countStore = await getStore();
    return res.status(200).json(countStore);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getCountWalker = async (req, res) => {
  try {
    const countWalker = await getWalker();
    return res.status(200).json(countWalker);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getCountDaycare = async (req, res) => {
  try {
    const countDaycare = await getDaycare();
    return res.status(200).json(countDaycare);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getCountProducts = async (req, res) => {
  try {
    const countProducts = await getProducts();
    return res.status(200).json(countProducts);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getFilterUsers = async (req, res) => {
  const { name, type } = req.query;
  try {
    const user = await getUserFilter(name, type);
    return res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getEarnings = async (req, res) => {
  try {
    const earnings = await getEarningsByInvoices();
    return res.status(200).json(earnings);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getEarningsByStore = async (req, res) => {
  const { idStore } = req.params;
  try {
    const earnings = await getEarningsByInvoiceStore(idStore);
    return res.status(200).json(earnings);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getCountUser,
  getCountStore,
  getCountWalker,
  getCountDaycare,
  getCountProducts,
  getFilterUsers,
  getEarnings,
  getEarningsByStore,
};