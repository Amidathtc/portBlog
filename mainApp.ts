import cors from "cors";
import express, { Application, NextFunction, Request, Response} from "express";
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";
import user from "./router/userRouter";
import friend from "./router/FriendRouter";
import request from "./router/RequestRouter";
import articles from "./router/articleRouter";
import category from "./router/categoryRouter";
import rating from "./router/RatingRouter";
import admin from "./router/adminRouter"

import comment from "./router/commentRouter";


export const mainApp = (app: Application) => {
    app.use(express.json());
    app.use(
        cors({
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"],
        })
    );

    app.get("/",(req: Request, res: Response) => {
        res.status(HTTP.OK).json({
            message: "Nice work ",
        })
    } )

    app.use("/api", user);
    app.use("/api", friend);
    app.use("/api", request);
    app.use("/api", rating);
    app.use("/api", articles);
    app.use("/api", category);
    app.use("/api", admin);
    app.use("/api", comment);
    

    app.all("*", (req : Request, res :Response, next: NextFunction) => {
        next(
            new mainError({
                name: "Router Error",
                message: `This error is coming up because the  URL, isn't correct`,
                status: HTTP.BAD_REQUEST,
                success: false,
            })
        )
    } )
app.use(errorHandler)
}
