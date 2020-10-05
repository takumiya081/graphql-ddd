import {err, ok, Result} from 'neverthrow';

import {ValueObject} from '~/core/domain/ValueObject';

type ErrorType = {
  message: string;
};

interface OwnerNameProps {
  value: string;
}

/**
 * Owner の名前
 */
export class OwnerName extends ValueObject<OwnerNameProps> {
  public static create(name: string): Result<OwnerName, ErrorType> {
    if (name.length >= 255) {
      return err({message: 'nameは255文字以内にしてください'});
    }
    if (name.trim().length === 0) {
      return err({message: 'nameが空です'});
    }
    return ok(new OwnerName({value: name}));
  }
}
