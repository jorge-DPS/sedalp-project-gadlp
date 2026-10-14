const palette = ['#2563eb', '#d97706', '#9333ea', '#0d9488', '#0284c7', '#db2777', '#4d7c0f']

export function regionColor(regionId: number): string {
  return palette[regionId - 1] ?? `hsl(${(regionId * 137.508) % 360} 65% 40%)`
}
