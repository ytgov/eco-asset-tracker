import { KnexService } from "./knex-service";

export class KnexUserService extends KnexService {
  override async update(_id: any, item: any): Promise<any> {
    return await this.db(this.tableName)
      .where({ email: item.email })
      .update(item);
  }
}
