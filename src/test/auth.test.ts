import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns the key when a valid 'ApiKey' header is provided", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key-123",
    };

    expect(getAPIKey(headers)).toBe("my-secret-key-123");
  });

  test("returns null if the authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {
      "host": "localhost"
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if the scheme is 'Bearer' instead of 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer some-token",
    };

    expect(getAPIKey(headers)).toBeNull();
  });
});
