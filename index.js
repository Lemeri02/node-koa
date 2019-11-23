const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const PORT = 3003;
const { log, error } = console;
const path = require('path');
const fs = require('fs');

app
  .use(async (ctx, next) => {
  log(ctx.url);
ctx.set('Content-Type', 'text/html; charset=utf-8');
  try {
  await next();
  if (ctx.status === 404) ctx.body = 'Пока нет!';
    } catch (e) {
  if (e.status) {
    ctx.body = `Ошибка пользователя: ${e.message}`;
    ctx.status = e.status;
  } else {
    ctx.body = `Ошибка приложения: ${e}`;
    ctx.status = 500;
    error(e.message, e.stack);
    }
  }
  })
  .use(router.routes())
  .listen(process.env.PORT || PORT, () => log(process.pid));
 
  router
  .get('/', async (ctx, next) => {
    const stream = fs.createReadStream(path.resolve(__dirname, 'index.js'));
    ctx.status = 200;
    ctx.response.set('Content-Type', 'application/javascript; charset=utf-8');
    ctx.body = stream;
  })
