import {Entity} from '~/core/domain/Entity';
import {UniqueEntityID} from '~/core/domain/UniqueEntityID';

import {OwnerName} from './OwnerName';
import {OwnerPaymentDestinationId} from './OwnerPaymentDestinationId';

interface OwnerProps {
  name: OwnerName;
  paymentDestinationId?: OwnerPaymentDestinationId;
}

export class Owner extends Entity<OwnerProps> {
  public get id(): UniqueEntityID {
    return this._id;
  }

  public get name() {
    return this.name;
  }

  public set name(name: OwnerName) {
    this.props.name = name;
  }

  public get paymentDestinationId() {
    return this.props.paymentDestinationId;
  }

  public static create(props: OwnerProps, id: UniqueEntityID) {
    return new Owner(props, id);
  }
}
