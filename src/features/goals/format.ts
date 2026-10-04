const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** $1,050 or $1,050.77 (US format). */
export function money(n: number, cents = false) {
  const fixed = cents ? n.toFixed(2) : Math.round(n).toString();
  const [int, dec] = fixed.split('.');
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${withCommas}${dec ? `.${dec}` : ''}`;
}

/** "May 2027" */
export const monthYear = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

/** "May '27" */
export const monthYearShort = (d: Date) => `${MONTHS_SHORT[d.getMonth()]} ’${String(d.getFullYear()).slice(2)}`;

/** "1 month", "8 months", "2 years", "1 year, 3 months" */
export function duration(months: number) {
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'}`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const years = `${y} ${y === 1 ? 'year' : 'years'}`;
  return m ? `${years}, ${m} ${m === 1 ? 'month' : 'months'}` : years;
}

/** Full spoken amount for VoiceOver (FOUNDATIONS §8). */
export function moneySpoken(n: number) {
  const dollars = Math.floor(n);
  const cents = Math.round((n - dollars) * 100);
  return cents ? `${dollars} dollars and ${cents} cents` : `${dollars} dollars`;
}

/** "October 15" */
export const monthDay = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getDate()}`;
