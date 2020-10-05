import {Customer} from '../model/Customer';

export interface CustomerRepository {
  createCustomer: (customer: Customer) => Promise<void>;
}
