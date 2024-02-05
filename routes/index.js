// route/index.js
const Router = require('koa-router');
const addTaskRoute = require('./taskRoute');
const addAuthRoute = require('./authRoute');

const router = new Router({ prefix: '/api' });

addTaskRoute(router);
addAuthRoute(router);

module.exports = router;

