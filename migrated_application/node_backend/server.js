require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const { log } = require('./utils/logger');
const listProducts = require('./handlers/listProducts');
const createProduct = require('./handlers/createProduct');
const updateProduct = require('./handlers/updateProduct');
const deleteProduct = require('./handlers/deleteProduct');

const app = express();
app.use(bodyParser.json());

// List products
app.get('/api/products', async (req, res) => {
  try {
    const result = await listProducts({});
    res.status(result.statusCode).json(JSON.parse(result.body));
  } catch (err) {
    log({ level: 'error', message: err.message });
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const result = await createProduct({ body: req.body });
    res.status(result.statusCode).json(JSON.parse(result.body));
  } catch (err) {
    log({ level: 'error', message: err.message });
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const result = await updateProduct({ body: { ...req.body, id: req.params.id } });
    res.status(result.statusCode).json(JSON.parse(result.body));
  } catch (err) {
    log({ level: 'error', message: err.message });
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const result = await deleteProduct({ pathParameters: { id: req.params.id } });
    res.status(result.statusCode).json(JSON.parse(result.body));
  } catch (err) {
    log({ level: 'error', message: err.message });
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  log({ level: 'info', message: `Express server running on port ${PORT}` });
  console.log(`Express server running on port ${PORT}`);
});
