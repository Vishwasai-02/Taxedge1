/**
 * Maybe Monad for handling values that might be null or undefined.
 * Allows safe chaining of operations without throwing null-pointer exceptions.
 */
export class Maybe {
  constructor(value) {
    this.$value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  static just(value) {
    return new Maybe(value);
  }

  static nothing() {
    return new Maybe(null);
  }

  isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this.$value));
  }

  chain(fn) {
    return this.isNothing() ? this : fn(this.$value);
  }

  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this.$value;
  }
}

/**
 * Result Monad representing either a Success or a Failure outcome.
 * Perfect for validations, credentials verification, or any operations that can fail.
 */
export class Result {
  constructor(value, isSuccess, error) {
    this.value = value;
    this.isSuccess = isSuccess;
    this.error = error;
  }

  static success(value) {
    return new Result(value, true, null);
  }

  static failure(error) {
    return new Result(null, false, error);
  }

  map(fn) {
    return this.isSuccess ? Result.success(fn(this.value)) : this;
  }

  chain(fn) {
    return this.isSuccess ? fn(this.value) : this;
  }

  getOrElse(fnOrValue) {
    if (this.isSuccess) {
      return this.value;
    }
    return typeof fnOrValue === 'function' ? fnOrValue(this.error) : fnOrValue;
  }
}
