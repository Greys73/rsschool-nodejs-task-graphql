import { GraphQLBoolean } from "graphql";
import { UUIDType } from "../uuid.js";
import { PrismaClient } from "@prisma/client";
import { ChangeProfileInputType, CreateProfileInputType, ProfileType, TProfileCreateInput } from "../ProfileType.js";

export const createProfile = {
  type: ProfileType,
  description: 'Create new profile',
  args: { dto: { type: CreateProfileInputType } },
  resolve: async (_, args: {dto: TProfileCreateInput}, db: PrismaClient) => {
    const { dto: data } = args;
    return await db.profile.create({ data });
  }
};

export const changeProfile = {
  type: ProfileType,
  description: 'Change profile by ID',
  args: { id: { type: UUIDType }, dto: { type: ChangeProfileInputType } },
  resolve: async (_, args: {id: string, dto: TProfileCreateInput}, db: PrismaClient) => {
    const { id, dto: data } = args;
    return  await db.profile.update({ where: { id }, data });
  }
};

export const deleteProfile = {
  type: GraphQLBoolean,
  description: 'Delete some profile',
  args: { id: { type: UUIDType } },
  resolve: async (_, { id }: { id: string }, db: PrismaClient) => {
    await db.profile.delete({ where: { id } });
    return null;
  }
};