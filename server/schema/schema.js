const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

var _ = require("lodash");
var User = require("../model/user");
var Hobby = require("../model/hobby");
var Post = require("../model/post");

var userData = [
  { id: "1", name: "Chris", age: 32, profession: "worker" },
  { id: "13", name: "Beau", age: 2, profession: "dog" },
  { id: "211", name: "Scout", age: 36, profession: "menace" },
  { id: "19", name: "Gina", age: 36, profession: "boss" },
  { id: "150", name: "Georgina", age: 36, profession: "stuff" },
];

var hobbyData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computers to make the world a better place",
    user: "1",
  },
  {
    id: "2",
    title: "Rowing",
    description: "Sweat and feel better before eating donuts",
    user: "13",
  },
  {
    id: "3",
    title: "Swimming",
    description: "Get in the water and learn to become the water",
    user: "211",
  },
  {
    id: "4",
    title: "Fencing",
    description: "A hobby for fency people",
    user: "1",
  },
  {
    id: "5",
    title: "Hiking",
    description: "Wear hiking boots and explore the world",
    user: "13",
  },
];

var postData = [
  {
    id: "1",
    title: "First Post",
    body: "Hello this is my first post",
    user: "1",
  },
  {
    id: "2",
    title: "Beau is being weird",
    body: "He just stands and stares at me",
    user: "1",
  },
  {
    id: "3",
    title: "I am Beau",
    body: "I have been severly displease with the lack of hikes. Thus, I have killed the male human and destroyed his flashing stones",
    user: "13",
  },
  {
    id: "4",
    title: "I am Scout",
    body: "I have killed the dog because I was bored",
    user: "211",
  },
];

//Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user ...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postData, { user: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbyData, { user: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby Description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.user });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.user });
      },
    },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(userData, { id: args.id });
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userData;
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbyData, { id: args.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbyData;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postData, { id: args.id });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postData;
      },
    },
  },
});

//Mutations

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        // id: {type: GraphQLID},
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },

      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };
        return user;
      },
    },
    createPost: {
      type: PostType,
      args: {
        // id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        user: { type: GraphQLID },
      },
      resolve(parent, args) {
        let post = { title: args.title, body: args.body, user: args.user };
        return post;
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: { type: GraphQLID },
      },
      resolve(parent, args) {
        let hobby = {
          title: args.title,
          description: args.description,
          user: args.user,
        };
        return hobby;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
