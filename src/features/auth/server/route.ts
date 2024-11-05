import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { console } from "inspector";
import { loginSchema } from "../schema";

const app = new Hono().post(
    "/login",
    zValidator("json", loginSchema),
    (c) => {
        const { email, password } = c.req.valid("json");
        console.log({ email, password });
        return c.json({ email, password });
    });

export default app;
