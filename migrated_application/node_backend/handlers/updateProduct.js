const httpErrors = require('http-errors');
const { update } = require('../utils/mongodb');
const { log } = require('../utils/logger');

module.exports = async (event) => {
  try {
    const product = event.body;
    if (!product.id) throw httpErrors(400, 'Product ID required');
    const result = await update({ collection: 'products', id: product.id, update: product });
    log({ level: 'info', message: 'Updated product', meta: { id: product.id } });
    return {
      statusCode: 200,
      body: JSON.stringify({ product: result })
    };
  } catch (err) {
    log({ level: 'error', message: err.message });
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
