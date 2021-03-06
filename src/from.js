import * as utils from './utils';


function compose(f, g) {
  return (x) => g(f(x));
}


export class From {
  constructor(fromKey, transform=(v) => v) {
    this.isFromKey = true;
    this.fromKey = fromKey;
    this.transform = transform;
  }

  defaultTo(defaultValue) {
    return new From(this.fromKey, compose(this.transform, utils.defaultTo(defaultValue)));
  }

  toString() {
    return new From(this.fromKey, compose(this.transform, utils.toString));
  }

  toNumber() {
    return new From(this.fromKey, compose(this.transform, utils.toNumber));
  }

  toInteger() {
    return new From(this.fromKey, compose(this.transform, utils.toInteger));
  }

  toFloat() {
    return new From(this.fromKey, compose(this.transform, utils.toFloat));
  }

  toBoolean() {
    return new From(this.fromKey, compose(this.transform, utils.toBoolean));
  }

  mapFrom(mapping) {
    return new From(this.fromKey, compose(this.transform, utils.mapFrom(mapping)));
  }

  using(fn) {
    return new From(this.fromKey, compose(this.transform, utils.using(fn)))
  }
}


export default function fromKey(fromKey) {
  return new From(fromKey);
}
