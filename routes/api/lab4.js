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
// Вывод всех покупателей (Customer), заказавших товар (Product) на сумму,
//  превышающих заданное значение.

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

// @route GET api/lab4/customer/:prod_id/:ord_sum
// @desc gets all customers bought product on summary more then written
router.get('/customer/:prod_id/:ord_sum', async (req, res) => {
  const productId = req.params.prod_id;
  const orderSum = Number.parseFloat(req.params.ord_sum);

  let product, foundOrderItems, orders, customers;
  try {
    product = await Product.findOne({ _id: productId });
  } catch (err) {
    res.status(404).json({ fetchError: 'No such product' });
  }

  try {
    foundOrderItems = await OrderItem.find({ product: productId });

    foundOrderItems = foundOrderItems.filter(
      item => item.quantity * product.price > orderSum
    );
  } catch (err) {
    res.status(404).json({ fetchError: 'No orders for such product' });
  }

  if (foundOrderItems.length === 0) {
    res.json({ fetchError: 'No orders for such summary' });
  }

  try {
    orders = await Orders.find({
      orderItems: {
        $in: foundOrderItems.map(item => item._id)
      }
    });
  } catch (err) {
    res.status(404).json({ fetchError: 'Have no such orders' });
  }

  try {
    customers = await Customer.find({
      _id: {
        $in: orders.map(order => order.customer)
      }
    });
  } catch (err) {
    res.status(404).json({ fetchError: 'Have no such customers' });
  }

  res.json({
    foundCustomers: customers
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
