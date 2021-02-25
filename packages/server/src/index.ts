import "reflect-metadata";
import "dotenv-safe/config";
import { createConnection } from "typeorm";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { COOKIE_NAME, resolver, __prod__ } from "./constants";
import path from "path";

const main = async () => {
  const conn = await createConnection({
    type: "mysql",
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    logging: __prod__,
    password: process.env.DATABASE_PASSWORD,
    synchronize: true,
    entities: [path.join(__dirname, "./entities/*")],
    // migrations: [path.join(__dirname, "./migrations/*")],
  });

  await conn.runMigrations();
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  // nginx 等のproxyにクッキー等の情報を渡す
  app.set("trust proxy", 1);
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".codeponder.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolver,
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get("/", (_, res) => {
    res.send("hello");
  });
  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost: 4000");
  });
};
main().catch((err) => {
  console.error(err);
});
console.log(process.env);
