import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);
  try {
    const usersResp = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .get();

    if (!usersResp) throw new Error("User Not Found");

    if (!bcrypt.compareSync(password, usersResp.password as string)) {
      throw new Error("Invalid Credentials ");
    }

    const authUser = usersResp;
    authUser["password"] = null;
    await setUserSession(event, {
      user: authUser,
    });

    return authUser;
  } catch (e: any) {
    throw createError({
      status: 401,
      message: "Bad credentials",
    });
  }
});
