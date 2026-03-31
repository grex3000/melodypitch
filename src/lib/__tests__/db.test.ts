import { db } from "../db";

describe("Prisma client singleton", () => {
  it("returns the same instance on repeated imports", async () => {
    const { db: db2 } = await import("../db");
    expect(db).toBe(db2);
  });

  it("can connect to the database", async () => {
    await expect(db.$connect()).resolves.not.toThrow();
  });

  afterAll(async () => {
    await db.$disconnect();
  });
});
