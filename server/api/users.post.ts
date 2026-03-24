import { db, schema } from "@nuxthub/db";

export default eventHandler(async (event) => {
  const { name, email, password, avatar } = await readBody(event);

  return await db
    .insert(schema.users)
    .values({
      name,
      email,
      password,
      avatar,
      createdAt: new Date(),
    })
    .returning();
});
