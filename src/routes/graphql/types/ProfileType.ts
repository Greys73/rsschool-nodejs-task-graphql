import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { GraphQLMemberType, MemberType } from "./MemberType.js";
import { TContext } from "./types.js";
import DataLoader from "dataloader";

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
      resolve: async (root: { memberTypeId: string }, _, ctx: TContext, info) => {
        const { memberTypeId: id } = root;
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