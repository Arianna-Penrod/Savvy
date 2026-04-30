export function isValidBarcode(barcode: string): boolean {
  return /^[0-9]{8,14}$/.test(barcode); // simple regex to check if it's 8-14 digits
}