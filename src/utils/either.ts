type Left<T> = {
  left: T;
  right?: never;
};

type Right<U> = {
  left?: never;
  right: U;
};

export type Either<T, U> = NonNullable<Left<T> | Right<U>>;
