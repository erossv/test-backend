// app.js
const fs = require('fs');
const Koa = require('koa');
require('dotenv').config();
const bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');

const { authenticateJWT } = require('./middleware/auth');
const router = require('./routes');

const app = new Koa();

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    app.use(morgan('combined', { stream: accessLogStream }));
} else {
    app.use(morgan('dev'));
}

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = typeof err.status === 'number' && err.status >= 400 && err.status <= 599 ? err.status : 500;
        ctx.body = err.message || 'Internal Server Error';
    }
});

app.use(authenticateJWT);

app.use(bodyParser());

app.use(router.routes());

const port = process.env.SERVER_PORT || 3030;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
