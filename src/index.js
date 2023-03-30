import mysql from 'mysql2/promise';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { DatabaseService } from './services/database.service';
import { EmailService } from './services/email.service';
import { RepositoryService } from './services/repository.service';
import { UserService } from './services/user.service';
import { PutUsersController } from './controllers/put-users.controller';

// Это нужно вынести в другой файл
// Переменные из .env нужно валидировать, а не использовать ||
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'main',
  waitForConnections: true,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 100,
  queueLimit: 0,
  // Если не использовать лимит, то очередь из обращений к БД может стать бесконечно большой
});

// Тут можно использовать какой-нибудь контейнер, например inversify
const databaseService = new DatabaseService(pool);
const emailService = new EmailService();
const repositoryService = new RepositoryService({
  databaseService,
});

const app = new Koa();

app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript'],
  },
}));
app.use(async (ctx, next) => {
  // Для каждого входящего запроса не обязательно создавать новый экземпляр сервиса
  ctx.userService = new UserService({
    repositoryService,
    emailService,
  });

  return next();
});
app.use(PutUsersController);

export const httpServer = app.listen(process.env.PORT || '4000');
httpServer.on('close', async () => {
  await pool.end();
});
