import {err, ok, Result} from 'neverthrow';

import {ValueObject} from '~/core/domain/ValueObject';

type ErrorType = {
  message: string;
};

interface CustomerNameProps {
  value: string;
}

/**
 * Customer の名前
 */
export class CustomerName extends ValueObject<CustomerNameProps> {
  public static create(name: string): Result<CustomerName, ErrorType> {
    if (name.length >= 255) {
      return err({message: 'nameは255文字以内にしてください'});
    }
    if (name.trim().length === 0) {
      return err({message: 'nameが空です'});
    }
    return ok(new CustomerName({value: name}));
  }
}
