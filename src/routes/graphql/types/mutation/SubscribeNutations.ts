import { GraphQLObjectType, GraphQLBoolean } from "graphql";
import { UUIDType } from "../uuid.js";
import { PrismaClient } from "@prisma/client";
import { UserType } from "../UserType.js";

export const subscribeTo = {
  type: UserType as GraphQLObjectType,
  description: 'Subscribe to user',
  args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
  resolve: async (_, args: { userId: string, authorId: string }, db: PrismaClient) => {
    const { userId: id, authorId } = args;
    return await db.user.update({
      where: { id },
      data: { userSubscribedTo: { create: { authorId } } },
    });
  }
};

export const unsubscribeFrom = {
  type: GraphQLBoolean,
  description: 'Unsubscribe from user',
  args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
  resolve: async (_, args: { userId: string, authorId: string }, db: PrismaClient) => {
    const { userId: subscriberId, authorId } = args;
    await db.subscribersOnAuthors.delete({
      where: { subscriberId_authorId: {subscriberId, authorId} },
    });
    return true;
  }
};