import { graphql, parse, validate } from 'graphql';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const errors = validate(schema, parse(query), [depthLimit(5)]);
      if (errors && errors.length > 0) return { errors };

      return await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { db: prisma, loaders: new WeakMap() }
      });
    },
  });
};

export default plugin;
