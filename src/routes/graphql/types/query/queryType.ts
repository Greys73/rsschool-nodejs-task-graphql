import { GraphQLList, GraphQLObjectType } from "graphql";
import { UserType } from "../userType.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => prisma.user.findMany(),
    }
  },
 });