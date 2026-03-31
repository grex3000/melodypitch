import { db } from "../db";
import { getPortalBySlug, validateInviteToken } from "../portals";

// These tests hit the real test database — run after `npx prisma db seed`

describe("getPortalBySlug", () => {
  it("returns the portal for a valid slug", async () => {
    const portal = await getPortalBySlug("nocturne-lp");
    expect(portal).not.toBeNull();
    expect(portal?.slug).toBe("nocturne-lp");
    expect(portal?.name).toBe("Nocturne LP");
    expect(portal?.label.name).toBe("Nocturne Records");
  });

  it("returns null for an unknown slug", async () => {
    const portal = await getPortalBySlug("does-not-exist-xyz");
    expect(portal).toBeNull();
  });
});

describe("validateInviteToken", () => {
  it("returns false for a bogus token", async () => {
    const valid = await validateInviteToken("nocturne-lp", "not-a-real-token");
    expect(valid).toBe(false);
  });
});

afterAll(async () => {
  await db.$disconnect();
});
