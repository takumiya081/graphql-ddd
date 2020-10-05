import {Owner} from '../model/Owner';

export interface OwnerRepository {
  createOwner: (owner: Owner) => Promise<void>;
}
