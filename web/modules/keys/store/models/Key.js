export class Key {
  constructor(data = {}) {
    this._id = data._id;
    this.key_id = data.key;
    this.keytag = data.keytag;
    this.notes = data.notes;
    this.markings = data.markings;
    this.inventory = data.inventory;
    this.created_at = data.created_at;
    this.created_by = data.created_by;
    this.updated_at = data.updated_at;
  }
}
