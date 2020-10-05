import {PrismaClient} from '@prisma/client';

import {Customer} from '../../domain/model/Customer';
import {CustomerRepository as ICustomerRepository} from '../../domain/repository/CustomerRepository';

interface Dependencies {
  prisma: PrismaClient;
}

export class CustomerRepository implements ICustomerRepository {
  private prisma: PrismaClient;

  constructor(dependencies: Dependencies) {
    this.prisma = dependencies.prisma;
  }

  public async createCustomer(customer: Customer) {
    await this.prisma.customer.create({
      data: {
        id: customer.id.toString(),
        name: customer.name.props.value,
        paymentId: customer.paymentId?.props.value,
      },
    });
  }
}
