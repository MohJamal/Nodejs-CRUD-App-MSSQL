const config = require("../dbconfig");
const sql = require("mssql");

const getOrders = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let orders = await pool.request().query("select * from orders");

    res.json(orders.recordsets[0]);
  } catch (err) {
    res.json(err);
  }
};

const getOrderById = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let orders = await pool
      .request()
      .input("orderId", sql.Int, id)
      .query("select * from orders where id = @orderId");
    res.json(orders.recordsets[0]);
  } catch (err) {
    res.json(err);
  }
};

const addOrder = async (req, res) => {
  try {
    let order = { ...req.body };
    let pool = await sql.connect(config);
    let orders = await pool
      .request()
      .input("Title", sql.NVarChar, order.Title)
      .input("Message", sql.NVarChar, order.Message)
      .input("Quantity", sql.Int, order.Quantity)
      .input("City", sql.NVarChar, order.City)

      .query(
        " insert into orders values ( @Title , @Quantity  , @Message , @City ) "
      );

    res.json(orders.recordsets[0]);
  } catch (err) {
    res.json(err);
  }
};

const deleteOrderById = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let orders = await pool
      .request()
      .input("orderId", sql.Int, id)
      .query("delete from orders where id = @orderId");

    res.json(orders.recordsets[0]);
  } catch (err) {
    res.json(err);
  }
};

const updateOrder = async (req, res) => {
  try {
    let order = { ...req.body };
    let pool = await sql.connect(config);
    let orders = await pool
      .request()
      .input("Id", sql.Int, order.Id)
      .input("Title", sql.NVarChar, order.Title)
      .input("Message", sql.NVarChar, order.Message)
      .input("Quantity", sql.Int, order.Quantity)
      .input("City", sql.NVarChar, order.City)
      .query(
        " update orders set  Title =  @Title , Quantity = @Quantity  , Message=  @Message , City =  @City where id = @Id "
      );

    res.json(orders.recordsets[0]);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  deleteOrderById,
  updateOrder,
};
