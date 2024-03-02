import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType } from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";

const BASIC = MemberTypeId.BASIC;
const BUSINESS = MemberTypeId.BUSINESS;

export const GraphQLMemberType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [BASIC]: { value: BASIC },
    [BUSINESS]: { value: BUSINESS },
  }
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: GraphQLMemberType },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }
});