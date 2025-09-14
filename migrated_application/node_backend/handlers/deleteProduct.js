const httpErrors = require('http-errors');
const { remove } = require('../utils/mongodb');
const { log } = require('../utils/logger');

module.exports = async (event) => {
  try {
    const { id } = event.pathParameters || {};
    if (!id) throw httpErrors(400, 'Product ID required');
    const result = await remove({ collection: 'products', id });
    log({ level: 'info', message: 'Deleted product', meta: { id } });
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    log({ level: 'error', message: err.message });
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
