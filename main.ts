import { Application } from "./deps.ts";
import userRouter from "./user/userRouter.ts";

const app = new Application();

const env = Deno.env.toObject();

const port: number = Number.parseInt(env.PORT) || 3001;

app.use(userRouter.routes());

app.use(({ response }: { response: any }) => {
  response.body = "Deno Api Rest";
});

console.log("Server running on port", port);

await app.listen({ port });
