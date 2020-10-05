import {err, ok, Result} from 'neverthrow';

import {UniqueEntityID} from '~/core/domain/UniqueEntityID';

import {Customer} from './Customer';
import {CustomerName} from './CustomerName';
import {CustomerPaymentId} from './CustomerPaymentId';

interface CustomerFactoryProps {
  name: Parameters<typeof CustomerName.create>[0];
  customerId?: Parameters<typeof CustomerPaymentId.create>[0];
  id: UniqueEntityID;
}

type Errors = {
  field: string;
  message: string;
}[];

export function customerFactory(props: CustomerFactoryProps): Result<Customer, Errors> {
  const errors: Errors = [];

  const propsResults = {
    name: CustomerName.create(props.name),
    paymentId: props.customerId !== undefined ? CustomerPaymentId.create(props.customerId) : undefined,
  };

  if (propsResults.name.isOk() && (propsResults.paymentId === undefined || propsResults.paymentId.isOk())) {
    return ok(Customer.create({name: propsResults.name.value, paymentId: propsResults.paymentId?.value}, props.id));
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
