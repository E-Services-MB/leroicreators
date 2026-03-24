import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const ids = getRouterParam(event, "id");
  const data = await readBody(event);

  return await db
    .update(schema.posts)
    .set(data)
    .where(eq(schema.posts.id, ids));
});
