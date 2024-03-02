import { GraphQLBoolean, GraphQLObjectType } from "graphql";
import { UUIDType } from "../uuid.js";
import { PrismaClient } from "@prisma/client";
import { ChangeUserInputType, CreateUserInputType, TUserCreateInput, UserType } from "../UserType.js";

export const createUser = {
  type: UserType as GraphQLObjectType,
  description: 'Create new user',
  args: { dto: { type: CreateUserInputType } },
  resolve: async (_, args: {dto: TUserCreateInput}, db: PrismaClient) => {
    const { dto: data } = args;
    return await db.user.create({ data });
  }
};

export const changeUser = {
  type: UserType as GraphQLObjectType,
  description: 'Change user by ID',
  args: { id: { type: UUIDType }, dto: { type: ChangeUserInputType } },
  resolve: async (_, args: {id: string, dto: TUserCreateInput}, db: PrismaClient) => {
    const { id, dto: data } = args;
    return  await db.user.update({ where: { id }, data });
  }
};

export const deleteUser = {
  type: GraphQLBoolean,
  description: 'Delete some user',
  args: { id: { type: UUIDType } },
  resolve: async (_, { id }: { id: string }, db: PrismaClient) => {
    await db.user.delete({ where: { id } });
    return null;
  }
};

