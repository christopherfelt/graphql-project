const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = require("graphql");

//Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user ...",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {},
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
