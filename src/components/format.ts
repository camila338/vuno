/** $1,050 or $1,050.77 (US format). */
export function money(n: number, cents = false) {
  const fixed = cents ? n.toFixed(2) : Math.round(n).toString();
  const [int, dec] = fixed.split('.');
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${withCommas}${dec ? `.${dec}` : ''}`;
}

/** Full spoken amount for VoiceOver (FOUNDATIONS §8). */
export function moneySpoken(n: number) {
  const dollars = Math.floor(n);
  const cents = Math.round((n - dollars) * 100);
  return cents ? `${dollars} dollars and ${cents} cents` : `${dollars} dollars`;
}
