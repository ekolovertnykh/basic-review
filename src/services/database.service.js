export class DatabaseService {
  /**
   * @param {import('mysql2/promise').Pool} pool
   */
  constructor(pool) {
    this.pool = pool;
  }

  /**
   * @returns {Promise<import('mysql2/promise').Connection>}
   */
  async getConnection() {
    return this.pool.getConnection();
  }

  /**
   * @param { Function } callback
   * @returns {Promise<any>}
   */
  async transaction(callback) {
    const connection = await this.getConnection();
    let result = null;

    await connection.beginTransaction();
    try {
      result = await callback(connection);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    }

    // Если будет exception, то этот result не вернется.
    // В таком случае его можно объвить в блоке try и там же возвращать после коммита
    return result;
  }
}
