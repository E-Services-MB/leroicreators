import { db, schema } from "@nuxthub/db";

export default eventHandler(async (event) => {
  return await db.select().from(schema.contacts);
});
