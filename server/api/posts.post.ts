import { db, schema } from "@nuxthub/db";

export default eventHandler(async (event) => {
  const { title, link, category } = await readBody(event);

  return await db
    .insert(schema.posts)
    .values({
      title,
      link,
      category,
      createdAt: new Date(),
    })
    .returning();
});
