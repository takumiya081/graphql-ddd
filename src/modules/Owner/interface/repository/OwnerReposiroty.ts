import {PrismaClient} from '@prisma/client';

import {Owner} from '../../domain/model/Owner';
import {OwnerRepository as IOwnerRepository} from '../../domain/repository/OwnerRepository';

interface Dependencies {
  prisma: PrismaClient;
}

export class OwnerRepository implements IOwnerRepository {
  private prisma: PrismaClient;

  constructor(dependencies: Dependencies) {
    this.prisma = dependencies.prisma;
  }

  public async createOwner(owner: Owner) {
    await this.prisma.owner.create({
      data: {
        id: owner.id.toString(),
        name: owner.name.props.value,
        paymentDestinationId: owner.paymentDestinationId?.props.value,
      },
    });
  }
}
