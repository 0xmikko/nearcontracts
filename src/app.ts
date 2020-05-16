import { ConfigParams } from "./config/config";
import express, { Application } from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { morganLogger } from "./middleware/logger";
import bodyParser from "body-parser";
import container from "./config.inversify";
import { TYPES } from "./types";
import { TemplatesController } from "./controllers/templatesController";
import errorHandler from "./middleware/errorHandler";
import { loginRequireMiddleware} from './middleware/loginRequired'

export function createApp(config: ConfigParams): Promise<Application> {
  return new Promise<Application>(async (resolve) => {
    // Connecting Database
    try {
      await createConnection({
        type: "postgres",
        url: config.database_url,
        extra: {
          ssl: true,
          rejectUnauthorized: false,
        },
        entities: [
          // 'build/core/*.js',
          "src/core/*.ts",
        ],
      });
    } catch (e) {
      console.log("TypeORM connection error: ", e);
    }

    const app = express();
    app.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000",
      })
    );

    app.use(morganLogger);

    const loginRequired = loginRequireMiddleware(config.jwt_secret);

    app.use(bodyParser.json());

    const templatesController = container.get<TemplatesController>(
      TYPES.TemplatesController
    );

    app.get("/", (req, res) => {
      console.log(req);
      res.status(200).send("It works!");
    });

    // Documents Controller
    app.get("/api/templates/", loginRequired, templatesController.list());
    app.get("/api/templates/:id", loginRequired, templatesController.retrieve());
    app.post("/api/templates/", loginRequired, templatesController.create());
    app.put("/api/templates/:id", loginRequired, templatesController.update());

    // ERROR HANDLER
    app.use(errorHandler);
    let server = require("http").Server(app);
    resolve(server);
  });
}
