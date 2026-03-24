import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const ids = getRouterParam(event, "id");
  let { password, id, ...data } = await readBody(event);

  if (password !== "") {
    data = { ...data, password };
  }

  return await db
    .update(schema.users)
    .set(data)
    .where(eq(schema.users.id, ids));
});
