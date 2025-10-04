export const randomPrice = (min: number, max: number): number => {
  const delta = max - min
  const price = min + Math.round(Math.random() * delta) - 0.01
  return price
}
