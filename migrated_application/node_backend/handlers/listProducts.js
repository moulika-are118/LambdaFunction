const httpErrors = require('http-errors');
const { find } = require('../utils/mongodb');
const { log } = require('../utils/logger');

module.exports = async (event) => {
  try {
    const products = await find({ collection: 'products' });
    log({ level: 'info', message: 'Fetched products', meta: { count: products.length } });
    return {
      statusCode: 200,
      body: JSON.stringify({ products })
    };
  } catch (err) {
    log({ level: 'error', message: err.message });
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
