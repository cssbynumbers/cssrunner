export const decToHex: (dec: number) => string = (dec) => {
  let hex = dec.toString(16);

  while (hex.length !== 2) {
    hex = '0' + hex
  }

  return hex;
}