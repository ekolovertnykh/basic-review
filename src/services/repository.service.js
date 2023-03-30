export class RepositoryService {
  /**
   * @param { DatabaseService } databaseService
   */

  // DI
  constructor({ databaseService }) {
    this.databaseService = databaseService;
  }

  /**
   * @param { import('mysql2/promise').Connection } connection
   * @returns {Promise<import('mysql2/promise').Connection>}
   */

  // Непонятно почему в аргументах функции есть connection, если в коде это не используется
  // Если есть connection, то зачем вызывать эту функцию?
  // Почему нельзя создавать this.connection в конструкторе?
  async getConnection(connection) {
    return connection || this.databaseService.getConnection();
  }

  /**
   * @param {[any]} Repositories
   * @param { import('mysql2/promise').Connection } connection
   * @returns {Promise<{ userList?: UserListRepo }>}
   */
  async create(Repositories, connection = null) {
    const db = connection || await this.getConnection();
    return Repositories.reduce((repositories, Repository) => ({
      ...repositories,
      [Repository.name]: new Repository({
        db,
        table: Repository.table,
      }),
    }), {});
  }

  /**
   * @param { [BaseRepo] } Repositories
   * @param { function({ userList?: UserListRepo }) } callback
   * @returns {Promise<Object>}
   */
  async transaction(Repositories, callback) {
    return this.databaseService.transaction(async (connection) => {
      const repositories = await this.create(Repositories, connection);
      return await callback(repositories);
    });
  }
}
