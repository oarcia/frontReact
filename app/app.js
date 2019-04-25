const { GraphQLServer, PubSub} = require("graphql-yoga");// es el framework
//const  { GraphQLServer, PubSub } = require
const { importSchema } = require("graphql-import");//reconozca la sinstaxis que le estamos mandando
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = importSchema("./app/schema.graphql");
const resolvers = require("./resolvers")
const mongoose = require("mongoose");

const { db } = require("./config");


const pubSub = new PubSub();

mongoose.connect(db.url, {
    //useCreateIndex: true,
    useNewUrlParser: true
});
const mongo = mongoose.connection;

mongo.on("error", (error) => console.log("fallo al conectar a mongo", error))
mongo.once("open",() => console.log("conectado mongo"));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const server = new GraphQLServer({
    schema,
    context: req =>({ ...req, pubSub})//definimos variables globales para nuestras funciones 
    //todo lo que comparte los resolver viene en el contexto
});

const options = {//solo se envia un endipoint para 
    port:process.env.PORT || 8000,
    endpoint: "/graphql",
    playground:"/playground"
};
server.start(options,({port})=>{
    console.log(`Magic start in port ${port}`);
});
module.exports = {schema}
