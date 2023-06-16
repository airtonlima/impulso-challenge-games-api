const app = require('express')();
const consign = require('consign');

consign({ cwd: 'src', verbose: false })
    .include('./config/middlewares.js')
    .include('./database')
    .include('./services')
    .include('./routes')
    .then('./config/router.js')
    .into(app);

module.exports = app;