import EmailVerification, { PasswordVerification } from "../components/Email_verification";

describe("EmailVerification", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("does not log an error for the allowed email", () => {
    EmailVerification({ email: "test@test.com" });
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it("logs an error for an invalid email", () => {
    EmailVerification({ email: "wrong@example.com" });
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Error: Invalid email or password"
    );
  });
});

describe("PasswordVerification", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("does not log an error for the allowed password", () => {
    PasswordVerification({ password: "test1234" });
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it("logs an error for an invalid password", () => {
    PasswordVerification({ password: "badpass" });
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Error: Invalid email or password"
    );
  });
});
