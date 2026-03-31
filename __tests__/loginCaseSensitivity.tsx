import { describe, it, expect } from "@jest/globals";
import { authenticateUser } from "../utils/loginAuth";

/*
  These tests validate the login authentication behavior.
  The function should:
  - Enforce case-sensitive username and password matching
*/

describe("authenticateUser function tests", () => {

  it("fails login when username case is incorrect", () => {
    const result = authenticateUser("madiuser", "Pass123!");

    expect(result).toBe(false);
  });

  it("fails login when password case is incorrect", () => {
    const result = authenticateUser("MadiUser", "pass123!");

    expect(result).toBe(false);
  });

  it("passes login with exact correct case", () => {
    const result = authenticateUser("MadiUser", "Pass123!");

    expect(result).toBe(true);
  });

});
