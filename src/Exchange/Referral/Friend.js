
export default class Friend {
  constructor({wallet_address, creation_timestamp}) {

    this.address = wallet_address;
    this.creationTimestamp = creation_timestamp;

  }

  static build(friendJsonArray) {
    return friendJsonArray.map(friendJson => new Friend(friendJson));
  }
}