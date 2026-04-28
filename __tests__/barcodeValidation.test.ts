import { isValidBarcode } from "../utils/barcodeValidation";

describe("barcode validation", () => { // tests for the isValidBarcode function
  test("accepts valid barcode", () => {
    expect(isValidBarcode("012345678905")).toBe(true);
  });

  test("rejects letters", () => {
    expect(isValidBarcode("abc123")).toBe(false);
  });

  test("rejects barcode that is too short", () => {
    expect(isValidBarcode("123")).toBe(false);
  });

  test("rejects barcode that is too long", () => {
    expect(isValidBarcode("12345678901234567890")).toBe(false);
  });
});