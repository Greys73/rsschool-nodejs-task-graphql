import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./ProfileType.js";
import { PostType } from "./PostType.js";
import { PrismaClient } from "@prisma/client";

export type TUserCreateInput = {
  id?: string
  name: string
  balance: number
}

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },

    name: { type: GraphQLString },

    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async (root: { id: string }, _, db: PrismaClient) => {
        const { id } = root;
        return await db.profile.findUnique({ where: { userId: id }});
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (root: { id: string }, _, db: PrismaClient) => {
        const { id } = root;
        return await db.post.findMany({ where: { authorId: id}});
      }
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (root: { id: string }, _, db: PrismaClient) => {
        const { id } = root;

        return await db.user.findMany({
          where: { subscribedToUser: { some: { subscriberId: id } } },
          include: { subscribedToUser: true },
        });
      }
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (root: { id: string }, _, db: PrismaClient) => {
        const { id } = root;

        return await db.user.findMany({
          where: { userSubscribedTo: { some: { authorId: id } } },
          include: { userSubscribedTo: true },
        });
      }
    },
  })
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});