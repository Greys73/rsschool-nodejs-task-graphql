import { GraphQLBoolean } from "graphql";
import { UUIDType } from "../uuid.js";
import { ChangePostInputType, CreatePostInputType, PostType, TPostCreateInput } from "../PostType.js";
import { TContext } from "../types.js";

export const createPost = {
  type: PostType,
  description: 'Create new post',
  args: { dto: { type: CreatePostInputType } },
  resolve: async (_, args: {dto: TPostCreateInput}, { db }: TContext) => {
    const { dto: data } = args;
    return await db.post.create({ data });
  }
};

export const changePost = {
  type: PostType,
  description: 'Change post by ID',
  args: { id: { type: UUIDType }, dto: { type: ChangePostInputType } },
  resolve: async (_, args: {id: string, dto: TPostCreateInput}, { db }: TContext) => {
    const { id, dto: data } = args;
    return  await db.post.update({ where: { id }, data });
  }
};

export const deletePost = {
  type: GraphQLBoolean,
  description: 'Delete some post',
  args: { id: { type: UUIDType } },
  resolve: async (_, { id }: { id: string }, { db }: TContext) => {
    await db.post.delete({ where: { id } });
    return null;
  }
};