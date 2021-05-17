const store = require('../../../store/mongo')
const crl = require('./controller')


module.exports = crl(store)