import {interfaceType} from '@nexus/schema';

import {decodeNodeId} from './utils/nodeId';

export const Node = interfaceType({
  name: 'Node',
  description: 'object node',
  definition(t) {
    t.id('id', {description: 'id for a resource'});
    t.resolveType((p) => {
      if (p.id) {
        const {type} = decodeNodeId(p.id);
        return type;
      }
      return null;
    });
  },
});
