export abstract class Entity<T> {
  protected constructor(protected props: T) {}

  public getProps(): T {
    return this.props;
  }
}
