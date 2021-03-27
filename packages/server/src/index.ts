import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, RESOLVERS, __prod__ } from "./constants";
import { createObjectiveLoader } from "./utils/loaders/createObjectiveLoader";

const main = async () => {
  const conn = await createConnection({
    type: "mysql",
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    logging: true,
    password: process.env.DATABASE_PASSWORD,
    synchronize: false,
    entities: [path.join(__dirname, "./entities/*")],
    // migrations: [path.join(__dirname, "./migrations/*")],
  });

  // await conn.runMigrations();
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  redis.on("error", function (err) {
    console.log("could not establish a connection with redis. " + err);
  });
  redis.on("connect", function () {
    console.log("connected to redis successfully");
  });
  // nginx 等のproxyにクッキー等の情報を渡す
  // app.set("trust proxy", 1);
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: RESOLVERS,
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      objectiveLoader: createObjectiveLoader(),
    }),
  });

  app.listen(4000, () => {
    console.log("server started on localhost: 4000");
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
};
main().catch((err) => {
  console.error(err);
});
