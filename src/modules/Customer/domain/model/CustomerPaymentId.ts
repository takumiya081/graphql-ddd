import {err, ok, Result} from 'neverthrow';

import {ValueObject} from '~/core/domain/ValueObject';

type ErrorType = {
  message: string;
};

interface CustomerPaymentIdProps {
  value: string;
}

/**
 * Customer の payment serviceにおけるid
 */
export class CustomerPaymentId extends ValueObject<CustomerPaymentIdProps> {
  public static create(name: string): Result<CustomerPaymentId, ErrorType> {
    if (name.length >= 255) {
      return err({message: 'paymentIdは255文字以内にしてください'});
    }
    if (name.trim().length === 0) {
      return err({message: 'paymentIdが空です'});
    }
    return ok(new CustomerPaymentId({value: name}));
  }
}
