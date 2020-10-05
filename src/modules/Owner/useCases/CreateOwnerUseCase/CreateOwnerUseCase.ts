import {ok, Result} from 'neverthrow';

import {UniqueEntityID} from '~/core/domain/UniqueEntityID';

import {Owner} from '../../domain/model/Owner';
import {ownerFactory} from '../../domain/model/ownerFactory';
import {OwnerRepository} from '../../domain/repository/OwnerRepository';

interface Dependencies {
  ownerRepository: OwnerRepository;
}

type Errors = {
  field?: string;
  message: string;
}[];

export interface CreateOwnerRequest {
  name: string;
}

export class CreateOwnerUseCase {
  private ownerRepository: OwnerRepository;

  constructor(dependencies: Dependencies) {
    this.ownerRepository = dependencies.ownerRepository;
  }

  public async execute(request: CreateOwnerRequest): Promise<Result<Owner, Errors>> {
    const id = new UniqueEntityID();
    const ownerResult = ownerFactory({id, name: request.name});
    if (ownerResult.isErr()) {
      return ownerResult;
    }

    try {
      await this.ownerRepository.createOwner(ownerResult.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return ok(ownerResult.value);
  }
}
