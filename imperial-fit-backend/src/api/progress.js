import express from "express";
import { getProgressByUser, createProgress, deleteProgress } from "../application/progress.js";

const progressRouter = express.Router();

progressRouter.route("/")
    .get(getProgressByUser)
    .post(createProgress);

progressRouter.route("/:id")
    .delete(deleteProgress);

export default progressRouter;
