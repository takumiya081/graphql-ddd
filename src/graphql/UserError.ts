import {objectType} from '@nexus/schema';

export const UserError = objectType({
  name: 'UserError',
  description: 'user error type',
  definition: (t) => {
    t.list.string('paths', {list: [true]});
    t.string('message', {description: 'user error message'});
  },
});
