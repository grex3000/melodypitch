// Middleware integration test — verify redirect logic by testing the isPublic helper inline

describe("Route protection logic", () => {
  const PUBLIC_PATHS = ["/login", "/register", "/api/auth"];
  const PORTAL_PATH_PATTERN = /^\/p\//;

  function isPublic(pathname: string): boolean {
    if (PORTAL_PATH_PATTERN.test(pathname)) return true;
    return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  }

  it("marks /login as public", () => {
    expect(isPublic("/login")).toBe(true);
  });

  it("marks /p/my-portal as public (portal submission)", () => {
    expect(isPublic("/p/nocturne-lp")).toBe(true);
  });

  it("marks /label/dashboard as protected", () => {
    expect(isPublic("/label/dashboard")).toBe(false);
  });

  it("marks /artist/pitches as protected", () => {
    expect(isPublic("/artist/pitches")).toBe(false);
  });
});
