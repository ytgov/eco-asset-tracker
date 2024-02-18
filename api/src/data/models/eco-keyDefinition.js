export class KeyDefinition {
  constructor(data) {
    this._id = data._id || null;
    this.notes = data.notes || null;
    this.markings = data.markings || null;
    this.keytag = data.keytag || null;
    this.inventory = data.inventory || null;
  }
}
