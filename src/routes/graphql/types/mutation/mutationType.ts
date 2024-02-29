import { PrismaClient } from "@prisma/client";
import { GraphQLBoolean, GraphQLObjectType } from "graphql";

const prisma = new PrismaClient();

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: {
    users: {
      type: GraphQLBoolean,
      resolve: () => prisma.user.findMany(),
    }
  },
 });