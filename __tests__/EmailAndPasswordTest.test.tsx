// Import the functions being tested from the email verification module.
// The default export is EmailVerification and the named export is PasswordVerification.
import EmailVerification, { PasswordVerification } from "../components/Email_verification";

// Test suite for the EmailVerification function.
describe("EmailVerification", () => {
  // Holds the Jest spy for console.log so we can inspect logging behavior.
  let consoleLogSpy: jest.SpyInstance;

  // Set up a fresh spy before each test to isolate test cases.
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  // Clean up the spy after each test to restore normal console behavior.
  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("does not log an error for the allowed email", () => {
    // Run the EmailVerification function with an allowed email address.
    EmailVerification({ email: "test@test.com" });

    // A valid email should not produce an error log.
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it("logs an error for an invalid email", () => {
    // Run the EmailVerification function with an invalid email address.
    EmailVerification({ email: "wrong@example.com" });

    // The invalid email path should log the exact expected error message.
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Error: Invalid email or password"
    );
  });
});

// Test suite for the PasswordVerification function.
describe("PasswordVerification", () => {
  // Separate spy instance for password tests.
  let consoleLogSpy: jest.SpyInstance;

  // Initialize console.log spying before each password test.
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  // Restore console.log after each password test to avoid side effects.
  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("does not log an error for the allowed password", () => {
    // Run PasswordVerification with a valid password string.
    PasswordVerification({ password: "test1234" });

    // No error should be logged when the password is valid.
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it("logs an error for an invalid password", () => {
    // Run PasswordVerification with an invalid password string.
    PasswordVerification({ password: "badpass" });

    // The invalid password path should log the expected error message.
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Error: Invalid email or password"
    );
  });
});

