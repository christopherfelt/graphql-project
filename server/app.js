const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose Connected..."))
  .catch((error) => console.log(error));

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

// as such iiiiii
// per se
// quite frankly
// if you will iii
// indeed i
