import {Entity} from '~/core/domain/Entity';
import {UniqueEntityID} from '~/core/domain/UniqueEntityID';

import {CustomerName} from './CustomerName';
import {CustomerPaymentId} from './CustomerPaymentId';

interface CustomerProps {
  name: CustomerName;
  paymentId?: CustomerPaymentId;
}

export class Customer extends Entity<CustomerProps> {
  public get id(): UniqueEntityID {
    return this._id;
  }

  public get name() {
    return this.name;
  }

  public set name(name: CustomerName) {
    this.props.name = name;
  }

  public get paymentId() {
    return this.props.paymentId;
  }

  public static create(props: CustomerProps, id: UniqueEntityID) {
    return new Customer(props, id);
  }
}
