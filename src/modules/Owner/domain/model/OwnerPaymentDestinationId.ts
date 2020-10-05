import {err, ok, Result} from 'neverthrow';

import {ValueObject} from '~/core/domain/ValueObject';

type ErrorType = {
  message: string;
};

interface OwnerPaymentDestinationIdProps {
  value: string;
}

/**
 * Ownerの決済における支払い先アカウントのID
 */
export class OwnerPaymentDestinationId extends ValueObject<OwnerPaymentDestinationIdProps> {
  public static create(paymentDestinationId: string): Result<OwnerPaymentDestinationId, ErrorType> {
    if (paymentDestinationId.length > 255) {
      return err({message: 'paymentDestinationIdは255よりも短くしてください'});
    }
    if (paymentDestinationId.trim().length === 0) {
      return err({message: 'paymentDestinationIdが空です'});
    }
    return ok(new OwnerPaymentDestinationId({value: paymentDestinationId}));
  }
}
