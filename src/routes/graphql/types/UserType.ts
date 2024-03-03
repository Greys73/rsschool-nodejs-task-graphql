import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./ProfileType.js";
import { PostType } from "./PostType.js";
import { TContext } from "./types.js";
import DataLoader from "dataloader";

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
      resolve: async (root: { id: string }, _, ctx: TContext, info) => {
        const { id } = root;
        const { db, loaders } = ctx;
        let dl = loaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const rows = await db.profile.findMany({ where: { userId: { in: ids as string[] } } });
            const sortedInIdsOrder = ids.map(id => rows.find(x => x.userId === id));
            return sortedInIdsOrder;
          });
          loaders.set(info.fieldNodes, dl);
        }
        return dl.load(id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (root: { id: string }, _, ctx: TContext, info) => {
        const { id } = root;
        const { db, loaders } = ctx;
        let dl = loaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const rows = await db.post.findMany({
              where: { authorId: { in: ids as string[] } }
            });
            const sortedInIdsOrder = ids.map(id => rows.find(x => x.authorId === id));
            return sortedInIdsOrder;
          });
          loaders.set(info.fieldNodes, dl);
        }
        return [dl.load(id)];
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (root: { id: string }, _, ctx: TContext, info) => {
        const { id } = root;
        const { db, loaders } = ctx;
        let dl = loaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids) => {
            const rows = await db.user.findMany({
              where: { subscribedToUser: { some: { subscriberId: { in: ids as string[] } } } },
              include: { subscribedToUser: true },
            });
            const sortedInIdsOrder = ids.map(
              _id => rows.find(
                row => row.subscribedToUser.find(sub => sub.subscriberId === _id )
                )
              );
            return sortedInIdsOrder;
          });
          loaders.set(info.fieldNodes, dl);
        }
        const result = await dl.load(id);
        return result ? [result] : [];
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (root: { id: string }, _, ctx: TContext, info) => {
        const { id } = root;
        const { db, loaders } = ctx;
        let dl = loaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids) => {
            const rows = await db.user.findMany({
                where: { userSubscribedTo: { some: { authorId: { in: ids as string[] } } } },
                include: { userSubscribedTo: true } 
            });
            const sortedInIdsOrder = ids.map(
              _id => rows.find(
                row => row.userSubscribedTo.find(sub => sub.authorId === _id )
                )
              );
            return sortedInIdsOrder;
          });
          loaders.set(info.fieldNodes, dl);
        }
        return [dl.load(id)];
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