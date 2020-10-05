import {err, ok, Result} from 'neverthrow';

import {UniqueEntityID} from '~/core/domain/UniqueEntityID';

import {Owner} from './Owner';
import {OwnerName} from './OwnerName';
import {OwnerPaymentDestinationId} from './OwnerPaymentDestinationId';

interface OwnerFactoryProps {
  name: Parameters<typeof OwnerName.create>[0];
  paymentDestinationId?: Parameters<typeof OwnerPaymentDestinationId.create>[0];
  id: UniqueEntityID;
}

type Errors = {
  field: string;
  message: string;
}[];

export function ownerFactory(props: OwnerFactoryProps): Result<Owner, Errors> {
  const errors: Errors = [];

  const propsResults = {
    name: OwnerName.create(props.name),
    paymentDestinationId:
      props.paymentDestinationId !== undefined
        ? OwnerPaymentDestinationId.create(props.paymentDestinationId)
        : undefined,
  };

  if (
    propsResults.name.isOk() &&
    (propsResults.paymentDestinationId === undefined || propsResults.paymentDestinationId.isOk())
  ) {
    return ok(
      Owner.create(
        {name: propsResults.name.value, paymentDestinationId: propsResults.paymentDestinationId?.value},
        props.id,
      ),
    );
  }

  Object.entries(propsResults).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    if (value.isErr()) {
      errors.push({field: key, message: value.error.message});
    }
  });
  return err(errors);
}
