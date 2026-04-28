export function isValidBarcode(barcode: string): boolean {
  return /^[0-9]{8,14}$/.test(barcode);
}