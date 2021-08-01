const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = require("graphql");

var _ = require("lodash");

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
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby Description",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.user });
      },
    },
  },
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Description",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.user });
      },
    },
  },
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
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbyData, { id: args.id });
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
