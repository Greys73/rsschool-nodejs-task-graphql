import { GraphQLObjectType } from "graphql";
import { changeUser, createUser, deleteUser } from "./UserMutations.js";
import { changePost, createPost, deletePost } from "./PostMutations.js";
import { changeProfile, createProfile, deleteProfile } from "./ProfileMutations.js";
import { subscribeTo, unsubscribeFrom } from "./SubscribeNutations.js";

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: {

    createUser,
    changeUser,
    deleteUser,

    createPost,
    changePost,
    deletePost,

    createProfile,
    changeProfile,
    deleteProfile,

    subscribeTo,
    unsubscribeFrom,

  },
 });