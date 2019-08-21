
export default class Friend {
  constructor({address, creation_timestamp}) {

    this.address = address;
    this.creationTimestamp = creation_timestamp;

  }

  static build(friendJsonArray) {
    return friendJsonArray.map(friendJson => new Friend(friendJson));
  }
}