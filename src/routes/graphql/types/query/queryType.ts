import { GraphQLList, GraphQLObjectType } from "graphql";
import { GraphQLMemberType, MemberType } from "../MemberType.js";
import { UserType } from "../UserType.js";
import { ProfileType } from "../ProfileType.js";
import { PostType } from "../PostType.js";
import { UUIDType } from "../uuid.js";
import { TContext } from "../types.js";
import DataLoader from "dataloader";

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: {

    memberTypes: {
      type: new GraphQLList(MemberType),
      description: 'All member-types',
      resolve: async (_, __, { db }: TContext) => await db.memberType.findMany(),
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      description: 'All profiles',
      resolve: async (_, __, { db }: TContext) => await db.profile.findMany(),
    },

    posts: {
      type: new GraphQLList(PostType),
      description: 'All posts',
      resolve: async (_, __, { db }: TContext) => await db.post.findMany(),
    },

    users: {
      type: new GraphQLList(UserType),
      description: 'All users',
      resolve: async (_, __, { db }: TContext) => await db.user.findMany(),
    },


    memberType: {
      type: MemberType,
      description: 'Some member-type',
      args: { id: { type: GraphQLMemberType } },
      resolve: async (_, args: { id: string }, ctx: TContext, info) => {
        const { id } = args;
        const { db, loaders } = ctx;
        let dl = loaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const rows = await db.memberType.findMany({
              where: { id: { in: ids as string[] } }
            });
            const sortedInIdsOrder = ids.map(id => rows.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          loaders.set(info.fieldNodes, dl);
        }
        return dl.load(id);
      }
    },

    user: {
      type: UserType as GraphQLObjectType,
      description: 'Some user',
      args: { id: { type: UUIDType } },
      resolve: async (_, args: { id: string }, ctx: TContext, info) => {
        const { id } = args;
        const { db, loaders } = ctx;
        let dl = loaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const rows = await db.user.findMany({
              where: { id: { in: ids as string[] } }
            });
            const sortedInIdsOrder = ids.map(id => rows.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          loaders.set(info.fieldNodes, dl);
        }
        return dl.load(id);
      }
    },

    post: {
      type: PostType,
      description: 'Some post',
      args: { id: { type: UUIDType } },
      resolve: async (_, args: { id: string }, ctx: TContext, info) => {
        const { id } = args;
        const { db, loaders } = ctx;
        let dl = loaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const rows = await db.post.findMany({
              where: { id: { in: ids as string[] } }
            });
            const sortedInIdsOrder = ids.map(id => rows.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          loaders.set(info.fieldNodes, dl);
        }
        return dl.load(id);
      }
    },

    profile: {
      type: ProfileType,
      description: 'Some profile',
      args: { id: { type: UUIDType } },
      resolve: async (_, args: { id: string }, ctx: TContext, info) => {
        const { id } = args;
        const { db, loaders } = ctx;
        let dl = loaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const rows = await db.profile.findMany({
              where: { id: { in: ids as string[] } }
            });
            const sortedInIdsOrder = ids.map(id => rows.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          loaders.set(info.fieldNodes, dl);
        }
        return dl.load(id);
      }
    },

  },
 });