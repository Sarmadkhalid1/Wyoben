import configureStore from '../store/dev'

const store = configureStore()

export { store }
/**
 * Redux store configuration.
 * Require and export different files for production and development.
 */
// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./pxrod')
// } else {
//   module.exports = require('./dev')
// }
