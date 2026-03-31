import { validateUpload } from "../s3";

describe("validateUpload", () => {
  it("accepts audio/mpeg", () => {
    expect(validateUpload("audio/mpeg", 1_000_000)).toBeNull();
  });

  it("accepts audio/wav", () => {
    expect(validateUpload("audio/wav", 1_000_000)).toBeNull();
  });

  it("accepts audio/flac", () => {
    expect(validateUpload("audio/flac", 1_000_000)).toBeNull();
  });

  it("rejects unsupported type", () => {
    const err = validateUpload("video/mp4", 1_000_000);
    expect(err).toContain("Unsupported format");
  });

  it("rejects files over 80 MB", () => {
    const err = validateUpload("audio/mpeg", 80 * 1024 * 1024 + 1);
    expect(err).toContain("80 MB");
  });

  it("accepts exactly 80 MB", () => {
    expect(validateUpload("audio/mpeg", 80 * 1024 * 1024)).toBeNull();
  });
});
