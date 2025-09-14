const httpErrors = require('http-errors');
const { insert } = require('../utils/mongodb');
const { log } = require('../utils/logger');

module.exports = async (event) => {
  try {
    const product = event.body;
    const result = await insert({ collection: 'products', document: product });
    log({ level: 'info', message: 'Created product', meta: { id: result.id } });
    return {
      statusCode: 201,
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
