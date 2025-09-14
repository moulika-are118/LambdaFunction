const httpErrors = require('http-errors');
const handlers = {
  listProducts: require('./handlers/listProducts'),
  createProduct: require('./handlers/createProduct'),
  updateProduct: require('./handlers/updateProduct'),
  deleteProduct: require('./handlers/deleteProduct'),
};

exports.handler = async (event) => {
  try {
    const { operation, entity } = event;
    if (entity !== 'Product') throw new httpErrors.NotFound('Entity not found');
    if (!handlers[operation + 'Products']) throw new httpErrors.NotFound('Operation not found');
    return await handlers[operation + 'Products'](event);
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
