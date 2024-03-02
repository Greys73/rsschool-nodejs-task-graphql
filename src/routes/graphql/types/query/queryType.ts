import { GraphQLList, GraphQLObjectType } from "graphql";
import { GraphQLMemberType, MemberType } from "../MemberType.js";
import { UserType } from "../UserType.js";
import { ProfileType } from "../ProfileType.js";
import { PostType } from "../PostType.js";
import { UUIDType } from "../uuid.js";
import { PrismaClient } from "@prisma/client";

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: {

    memberTypes: {
      type: new GraphQLList(MemberType),
      description: 'All member-types',
      resolve: async (_, __, db: PrismaClient) => await db.memberType.findMany(),
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      description: 'All profiles',
      resolve: async (_, __, db: PrismaClient) => await db.profile.findMany(),
    },

    posts: {
      type: new GraphQLList(PostType),
      description: 'All posts',
      resolve: async (_, __, db: PrismaClient) => await db.post.findMany(),
    },

    users: {
      type: new GraphQLList(UserType),
      description: 'All users',
      resolve: async (_, __, db: PrismaClient) => await db.user.findMany(),
    },


    memberType: {
      type: MemberType,
      description: 'Some member-type',
      args: { id: { type: GraphQLMemberType } },
      resolve: async (_, args: { id: string }, db: PrismaClient) => {
        const { id } = args;
        return await db.memberType.findUnique({ where: { id }});
      }
    },

    user: {
      type: UserType as GraphQLObjectType,
      description: 'Some user',
      args: { id: { type: UUIDType } },
      resolve: async (_, args: { id: string }, db: PrismaClient) => {
        const { id } = args;
        return await db.user.findUnique({ where: { id }});
      }
    },

    post: {
      type: PostType,
      description: 'Some post',
      args: { id: { type: UUIDType } },
      resolve: async (_, args: { id: string }, db: PrismaClient) => {
        const { id } = args;
        return await db.post.findUnique({ where: { id }});
      }
    },

    profile: {
      type: ProfileType,
      description: 'Some profile',
      args: { id: { type: UUIDType } },
      resolve: async (_, args: { id: string }, db: PrismaClient) => {
        const { id } = args;
        return await db.profile.findUnique({ where: { id }});
      }
    },

  },
 });