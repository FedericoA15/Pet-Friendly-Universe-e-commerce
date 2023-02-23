const {
  getInvoices,
  getInvoicesId,
  createInvoice,
} = require("../controllers/invoicesController");

const getInvoiceHandler = async (req, res) => {
  try {
    let invoices = await getInvoices();
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getInvoiceIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let invoices = await getInvoicesId(id);
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const postInvoiceHandler = async (req, res) => {
  const { UserId, products } = req.body; //products = {product_id: amount,product_id: amount, ...}
  try {
    let invoice = await createInvoice(UserId, products);
    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getInvoiceHandler,
  getInvoiceIdHandler,
  postInvoiceHandler,
};