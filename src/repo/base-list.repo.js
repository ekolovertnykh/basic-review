import { BaseRepo } from './base.repo';

export class BaseListRepo extends BaseRepo {
  /**
   * @param {Object} entity
   * @returns {
   *   Promise<[
   *       import('mysql2/promise').ResultSetHeader
   *   ]>
   * }
   */
  async insert(entity) {
    return /** @type Promise<[import('mysql2/promise').ResultSetHeader]> */ this.db.query(
      'INSERT INTO ?? SET ?', [this.table, entity],
    );
  }
}
