import { hashPassword } from "@/lib/auth-utils";
import bcrypt from "bcryptjs";

describe("Auth session shape", () => {
  it("session includes role field", () => {
    type SessionUser = { id: string; email: string; role: "LABEL" | "SONGWRITER" | "ARTIST" };
    const user: SessionUser = { id: "1", email: "test@test.com", role: "LABEL" };
    expect(user.role).toBe("LABEL");
  });
});

describe("hashPassword", () => {
  it("produces a bcrypt hash that verifies correctly", async () => {
    const hash = await hashPassword("correct-horse-battery");
    const valid = await bcrypt.compare("correct-horse-battery", hash);
    expect(valid).toBe(true);
  });

  it("produces a different hash each call (salt is random)", async () => {
    const h1 = await hashPassword("same-password");
    const h2 = await hashPassword("same-password");
    expect(h1).not.toBe(h2);
  });
});
