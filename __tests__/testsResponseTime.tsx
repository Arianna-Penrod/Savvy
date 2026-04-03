import { performance } from "perf_hooks";

// Mock login function (replace with real API call)
async function login(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, token: "abc123" });
    }, 200); // simulate 200ms response time
  });
}

describe("Login API Performance Test", () => {
  
  it("should respond within acceptable time (<= 500ms)", async () => {
    const startTime = performance.now();

    const response = await login("testUser", "password123");

    const endTime = performance.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time: ${responseTime} ms`);

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThanOrEqual(500);
  });

});
