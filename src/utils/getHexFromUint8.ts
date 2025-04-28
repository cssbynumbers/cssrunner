import { decToHex } from "./decToHex";

export const getHexFromUint8: (pixelAtXY: Uint8ClampedArray) => [string, number[]] = (pixelAtXY) => {
  const [r,g,b,a] = pixelAtXY;
  const hex = `#${decToHex(r)}${decToHex(g)}${decToHex(b)}`

  return [
    hex,
    [r,g,b,a]
  ]
}