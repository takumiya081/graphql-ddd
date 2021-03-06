/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as ContextModule from "./infra/graphqlServer/context"
import { OwnerRootType } from "./graphql/Owner"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  OwnerCreateInput: { // input type
    name: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenRootTypes {
  Mutation: {};
  Owner: OwnerRootType;
  OwnerCreatePayload: { // root type
    owner?: NexusGenRootTypes['Owner'] | null; // Owner
    userErrors: NexusGenRootTypes['UserError'][]; // [UserError!]!
  }
  Query: {};
  UserError: { // root type
    message?: string | null; // String
    paths?: string[] | null; // [String!]
  }
  Node: NexusGenRootTypes['Owner'];
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  OwnerCreateInput: NexusGenInputs['OwnerCreateInput'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    ownerCreate: NexusGenRootTypes['OwnerCreatePayload']; // OwnerCreatePayload!
  }
  Owner: { // field return type
    id: string | null; // ID
    name: string | null; // String
    paymentId: string | null; // String
  }
  OwnerCreatePayload: { // field return type
    owner: NexusGenRootTypes['Owner'] | null; // Owner
    userErrors: NexusGenRootTypes['UserError'][]; // [UserError!]!
  }
  Query: { // field return type
    owner: NexusGenRootTypes['Owner'] | null; // Owner
  }
  UserError: { // field return type
    message: string | null; // String
    paths: string[] | null; // [String!]
  }
  Node: { // field return type
    id: string | null; // ID
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    ownerCreate: { // args
      input: NexusGenInputs['OwnerCreateInput']; // OwnerCreateInput!
    }
  }
  Query: {
    owner: { // args
      ownerId: string; // ID!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  Node: "Owner"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Owner" | "OwnerCreatePayload" | "Query" | "UserError";

export type NexusGenInputNames = "OwnerCreateInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = "Node";

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ContextModule.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}