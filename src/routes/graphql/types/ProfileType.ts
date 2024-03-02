import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { GraphQLMemberType, MemberType } from "./MemberType.js";
import { PrismaClient } from "@prisma/client";

export type TProfileCreateInput = {
  id?: string
  isMale: boolean
  yearOfBirth: number
  userId: string;
  memberTypeId: string;
}

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: GraphQLMemberType },
    memberType: {
      type: MemberType,
      resolve: async (root: { memberTypeId: string }, _, db: PrismaClient) => {
        const { memberTypeId: id } = root;
        return await db.memberType.findUnique({where: { id }});
      }
    },
  }
});

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: GraphQLMemberType },
  }
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLMemberType },
  }
});