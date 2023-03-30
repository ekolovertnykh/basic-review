/**
 * @param {{
 *   userService: UserService,
 *   method: string,
 *   path: string,
 *   request: {
 *     body: {
 *       users: [{nickname: string, email:string}],
 *     },
 *   },
 * }} ctx
 * @returns {Promise<void>}
 * @constructor
 */
export const PutUsersController = async (ctx) => {
  const { method, path } = ctx;
  const { users } = ctx.request.body;

  // Почему для создания пользователей используется метод PUT, а не POST?
  // Регулярку можно вынести в константу
  if (!/^PUT \/users$/.test(`${method} ${path}`)) {
    return;
  }

  // Где валидация на наличие users в body?
  const results = users.map((user) => ctx.userService.add(user));

  ctx.body = {
    // Promise.all можно использовать при объявлении переменной, а тут оставить просто { results }
    results: await Promise.all(results),
  };
};
