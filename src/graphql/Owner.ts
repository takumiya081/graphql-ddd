import {arg, extendType, idArg, inputObjectType, objectType} from '@nexus/schema';

import {OwnerRepository} from '~/modules/Owner/interface/repository/OwnerReposiroty';
import {CreateOwnerUseCase} from '~/modules/Owner/useCases/CreateOwnerUseCase';

import {UserError} from './UserError';
import {decodeNodeId, encodeNodeId} from './utils/nodeId';

export interface OwnerRootType {
  id: string;
  name: string;
  paymentId?: string;
}

export const Owner = objectType({
  name: 'Owner',
  description: 'type of owner object',
  rootTyping: {name: 'OwnerRootType', path: __filename},
  definition: (t) => {
    t.implements('Node');
    t.id('id', {description: 'id of owner', resolve: (p) => encodeNodeId('Owner', p.id)});
    t.string('name', {description: 'name of owner'});
    t.string('paymentId', {nullable: true, description: 'paymentId of payment transaction service'});
  },
});

export const OwnerQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('owner', {
      type: 'Owner',
      args: {
        ownerId: idArg({required: true, description: 'owner id'}),
      },
      description: 'get owner by id',
      resolve: async (_parent, {ownerId}, {prisma}) => {
        const {id} = decodeNodeId(ownerId);
        return prisma.owner.findOne({where: {id}});
      },
    });
  },
});

export const OwnerCreatePayload = objectType({
  name: 'OwnerCreatePayload',
  description: `owner create payload type`,
  definition: (t) => {
    t.field('owner', {
      type: Owner,
      description: 'create Owner',
    });
    t.list.field('userErrors', {
      type: UserError,
      description: 'create Owner Error',
      nullable: false,
      list: [true],
    });
  },
});

export const OwnerCreateInput = inputObjectType({
  name: 'OwnerCreateInput',
  description: 'create owner input type',
  definition: (t) => {
    t.string('name', {required: true, description: 'owner name'});
  },
});

export const OwnerMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('ownerCreate', {
      type: OwnerCreatePayload,
      description: 'create owner',
      nullable: false,
      args: {
        input: arg({type: OwnerCreateInput, description: 'input', required: true}),
      },
      resolve: async (_p, {input}, {prisma}) => {
        if (!input) {
          throw new Error('input value is invalid');
        }
        const {name} = input;
        const ownerRepository = new OwnerRepository({prisma});
        const createOwnerUserCase = new CreateOwnerUseCase({ownerRepository});
        const result = await createOwnerUserCase.execute({name});
        if (result.isErr()) {
          return {
            userErrors: result.error.map((e) => ({
              message: e.message,
              paths: e.field !== undefined ? [e.field] : undefined,
            })),
          };
        }
        const createdOwner = await prisma.owner.findOne({where: {id: result.value.id.toString()}});
        if (!createdOwner) {
          return {userErrors: [{message: '作成したオーナーの取得に失敗しました'}]};
        }
        return {owner: createdOwner, userErrors: []};
      },
    });
  },
});
