export function appendColorToStringProto(colors: Record<string, () => string>) {
  for (const colorsKey in colors) {
    String.prototype[colorsKey] = colors[colorsKey];
  }
}
