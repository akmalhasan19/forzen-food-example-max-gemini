/**
 * Format berat dalam gram/kg (pasar Indonesia)
 */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = (grams / 1000).toFixed(1);
    return kg.endsWith(".0") ? `${Math.round(grams / 1000)} kg` : `${kg} kg`;
  }
  return `${grams} g`;
}

/**
 * Konversi gram ke kilogram (desimal)
 */
export function gramsToKg(grams: number): number {
  return parseFloat((grams / 1000).toFixed(2));
}

/**
 * Get weight class description
 */
export function getWeightClass(grams: number): "light" | "medium" | "heavy" {
  if (grams < 500) return "light";
  if (grams < 2000) return "medium";
  return "heavy";
}
