const express = require('express');
const router = express.Router();

const Customer = require('../../models/Customer');
const OrderItem = require('../../models/OrderItem');
const Orders = require('../../models/Orders');
const Product = require('../../models/Product');
const Supplier = require('../../models/Supplier');

const validateCustomer = require('../../validation/customer');
const validateOrderItem = require('../../validation/orderitem');
const validateProduct = require('../../validation/product');
const validateSupplier = require('../../validation/supplier');

// ** TASK **
// Вывод всех заказов (Orders), сделанных покупателями (Customer), не ранее заданной даты.

// Validation add validation for input on LAB4
// if needed ????
// const validatePostInput = require('../../validation/post');

// @route   GET api/lab4/test
// @desc    Tests post route
router.get('/test', (req, res) => res.json({ msg: 'lab4 Works' }));

// @route GET api/lab4/
// @desc fetches all db files
router.get('/', async (req, res) => {
  let customers, orderItems, orders, products, suppliers;

  try {
    customers = await Customer.find();
  } catch (err) {
    res.status(404).json({ nocustomers: 'Have no customers' });
  }

  try {
    orderItems = await OrderItem.find();
  } catch (err) {
    res.status(404).json({ noorderitems: 'Have no order items' });
  }

  try {
    orders = await Orders.find();
  } catch (err) {
    res.status(404).json({ noorders: 'Have no orders' });
  }

  try {
    products = await Product.find();
  } catch (err) {
    res.status(404).json({ noproducts: 'Have no products' });
  }

  try {
    suppliers = await Supplier.find();
  } catch (err) {
    res.status(404).json({ nosuppliers: 'Have no suppliers' });
  }

  res.json({
    customers,
    orderItems,
    orders,
    products,
    suppliers
  });
});

// @route GET api/lab4/orders/:date
// @desc gets all orders made by customers after some date
router.get('/orders/:date', async (req, res) => {
  const date = new Date(req.params.date);

  let orders;

  try {
    orders = await Orders.find({
      date: { $gte: date }
    });
  } catch (err) {
    res.status(404).json({ fetchError: 'No such orders' });
  }

  res.json({
    foundOrders: orders
  });
});

// @route POST api/lab4/customer
// @desc creates customer
router.post('/customer', (req, res) => {
  const { errors, isValid } = validateCustomer(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newCustomer = new Customer({
    custName: req.body.custName,
    custFax: req.body.custFax,
    custTown: req.body.custTown
  });

  newCustomer.save().then(customer => res.json(customer));
});

// @route POST api/lab4/orderitem
// @desc creates Order Item
router.post('/orderitem', (req, res) => {
  const { errors, isValid } = validateOrderItem(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newOrderItem = new OrderItem({
    quantity: req.body.quantity,
    product: req.body.product
  });

  newOrderItem.save().then(orderItem => res.json(orderItem));
});

// @route POST api/lab4/orders
// @desc creates orders
router.post('/orders', (req, res) => {
  const newOrders = new Orders({
    customer: req.body.customer,
    paid: req.body.paid,
    date: req.body.date,
    executed: req.body.executed,
    orderItems: req.body.orderItems
  });

  newOrders.save().then(Orders => res.json(Orders));
});

// @route POST api/lab4/product
// @desc creates product
router.post('/product', (req, res) => {
  const { errors, isValid } = validateProduct(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newProduct = new Product({
    prodName: req.body.prodName,
    unit: req.body.unit,
    price: req.body.price,
    stock: req.body.stock,
    supplier: req.body.supplier
  });

  newProduct.save().then(product => res.json(product));
});

// @route POST api/lab4/supplier
// @desc creates supplier
router.post('/supplier', (req, res) => {
  const { errors, isValid } = validateSupplier(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newSupplier = new Supplier({
    supName: req.body.supName,
    supFax: req.body.supFax,
    supTown: req.body.supTown
  });

  newSupplier.save().then(supplier => res.json(supplier));
});

module.exports = router;
