import {ok, Result} from 'neverthrow';

import {UniqueEntityID} from '~/core/domain/UniqueEntityID';

import {Customer} from '../../domain/model/Customer';
import {customerFactory} from '../../domain/model/customerFactory';
import {CustomerRepository} from '../../domain/repository/CustomerRepository';

interface Dependencies {
  customerRepository: CustomerRepository;
}

type Errors = {
  field?: string;
  message: string;
}[];

export interface CreateCustomerRequest {
  name: string;
}

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepository;

  constructor(dependencies: Dependencies) {
    this.customerRepository = dependencies.customerRepository;
  }

  public async execute(request: CreateCustomerRequest): Promise<Result<Customer, Errors>> {
    const id = new UniqueEntityID();
    const customerResult = customerFactory({id, name: request.name});
    if (customerResult.isErr()) {
      return customerResult;
    }

    try {
      await this.customerRepository.createCustomer(customerResult.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return ok(customerResult.value);
  }
}
