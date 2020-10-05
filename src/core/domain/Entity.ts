import {UniqueEntityID} from './UniqueEntityID';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,no-use-before-define
const isEntity = (v: any): v is Entity<any> => {
  // eslint-disable-next-line no-use-before-define
  return v instanceof Entity;
};

/**
 * DDDのEntity (clean architectureのEntityは違う)
 * - 同じ属性でも区別される
 * - 同一性を持つ
 */
export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;

  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
