import { db, schema } from "@nuxthub/db";

export default eventHandler(async (event) => {
  const { name, contact, subject, message } = await readBody(event);

  return await db
    .insert(schema.contacts)
    .values({
      name,
      contact,
      subject,
      message,
      createdAt: new Date(),
    })
    .returning();
});
