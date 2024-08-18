import { Hono } from "hono";
import {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
  getByUserId,
  getAllDetails,
} from "../controllers/todoController";

const todoRouter = new Hono();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
await wait(5000);

todoRouter.post("/create", create);
todoRouter.post("/update", update);

todoRouter.get("/remove/:id", remove);
todoRouter.get("/getbyid/:id", getById);
todoRouter.get("/getbyuserid", getByUserId);
todoRouter.get("/getall", getAll);
todoRouter.get("/search", search);
todoRouter.get("/getalldetails", getAllDetails);

export default todoRouter;
