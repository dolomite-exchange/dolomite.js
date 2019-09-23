
/*
 * Usage:
 * export const MyEnum = Enum.create('ONE', 'TWO')
 */
export default class Enum {

  static create(...values) {
    const enumMapping = {};
    values.forEach(value => enumMapping[value] = value);
    return enumMapping;
  }
}
