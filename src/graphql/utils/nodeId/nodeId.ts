import {decode, encode} from 'js-base64';

import {NexusGenAbstractResolveReturnTypes} from '~/nexus-typegen';

const SEPARATOR = '=======';

/**
 * graphqlの interfaceとunion typeを使うには typeをresolveする必要がある。
 * なので、文字列からtypeを指定できるようにする
 */

export function encodeNodeId(type: NexusGenAbstractResolveReturnTypes['Node'], id: string): string {
  return encode(`${type}${SEPARATOR}${id}`);
}

export function decodeNodeId(encodedId: string): {type: NexusGenAbstractResolveReturnTypes['Node']; id: string} {
  const [type, id] = decode(encodedId).split(SEPARATOR, 2) as [string, string | undefined];
  if (id === undefined) {
    throw new Error('id is not valid value');
  }
  return {type: type as NexusGenAbstractResolveReturnTypes['Node'], id};
}
