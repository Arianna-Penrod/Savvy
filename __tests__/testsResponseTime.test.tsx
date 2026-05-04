import { describe, it, expect } from "@jest/globals";
import { performance } from "perf_hooks";

type LoginResponse = {
  status: number;
  token: string;
};

async function login(username: string, password: string): Promise<LoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, token: "abc123" });
    }, 200);
  });
}

describe("Login API performance test", () => {
  it("responds within acceptable time", async () => {
    const startTime = performance.now();

    const response = await login("test@test.com", "123456");

    const endTime = performance.now();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThanOrEqual(500);
  });
});