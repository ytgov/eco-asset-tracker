import { DATABASE_CONFIG } from "../config";

const knexOptions = DATABASE_CONFIG;

export class KnexService {
  constructor(tableName: string = "") {
    this.db = require("knex")(knexOptions);
    this.tableName = tableName;
  }
  public db;
  public tableName;
  async ensureDatabaseConnected() {
    return await this.db
      .raw("SELECT name, database_id, create_date  FROM sys.databases;  ")
      // .raw("SELECT name FROM master.dbo.sysdatabases ")
      // .raw(
      //   "SELECT * FROM INFORMATION_SCHEMA.TABLES where TABLE_TYPE = 'BASE TABLE'; "
      // )
      .then((result: any) => {
        console.log("DB connection established");
        return {
          status: "up",
          host: DATABASE_CONFIG.connection.host,
          client: DATABASE_CONFIG.client
        };
      })
      .catch((err: any) => {
        console.log(err);
        return {
          status: "error",
          host: DATABASE_CONFIG.connection.host,
          client: DATABASE_CONFIG.client,
          message: err
        };
      });
  }
  async create(item: any): Promise<any> {
    let result = null;
    try {
      result = await this.db(this.tableName).insert(item);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async update(_id: any, item: any): Promise<any> {
    return await this.db(this.tableName).where({ _id: item._id }).update(item);
  }
  async delete(query: any): Promise<any> {
    return await this.db(this.tableName).where(query).del();
  }
  async getAll(query: any, fields = ""): Promise<any> {
    //put in some kind of sort statement
    if (query === undefined) {
      query = {};
    }
    let result = null;
    try {
      result = await this.db.select(fields).from(this.tableName).where(query);
    } catch (err) {
      console.log(err);
      result = err;
    }
    return result;
  }
  async deleteWhere(query: any): Promise<any> {
    return await this.db(this.tableName).where(query).del();
  }
  async innerJoin(config: any): Promise<any> {
    return await this.db
      .select(config.fields)
      .from(config.tableName)
      .innerJoin(config.joinTable, config.joinField, config.joinTableField)
      .where(config.query);
  }
}
