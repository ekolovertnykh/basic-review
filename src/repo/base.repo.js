export class BaseRepo {
  /**
   * @param { import('mysql2/promise').Connection } db
   * @param { string } table
   */
  constructor({ db, table }) {
    this.db = db;
    this.table = table;
  }
}
