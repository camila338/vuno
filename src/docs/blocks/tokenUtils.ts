import { tokens, type TokenName } from '../../theme/tokens';
import { tokenMeta, type TokenMeta } from '../../theme/tokens.meta';

export { tokens, tokenMeta };
export type { TokenName, TokenMeta };

export const hex = (name: TokenName) => tokens[name] as string;

/** Tokens whose name starts with `prefix` (or matches one of `names`), in source order. */
export function selectTokens({ prefix, names, layer, exclude }: { prefix?: string; names?: string[]; layer?: TokenMeta['layer']; exclude?: string }) {
  const ex = exclude ? new RegExp(exclude) : null;
  return tokenMeta.filter(
    (t) =>
      (names ? names.includes(t.name) : prefix ? t.name.startsWith(prefix) : true) &&
      (!layer || t.layer === layer) &&
      (!ex || !ex.test(t.name)),
  );
}

type Typography = { fontFamily: string; fontSize: number; lineHeight: number; letterSpacing: number };
type Border = { width: number; color: string };
type Spring = { mass: number; stiffness: number; damping: number };

/** Human-readable value, as written in FOUNDATIONS.md. */
export function formatValue(t: TokenMeta): string {
  const v = t.value;
  switch (t.type) {
    case 'color':
      return String(v);
    case 'dimension':
      return `${v} px`;
    case 'duration':
      return `${v} ms`;
    case 'number':
      return String(v);
    case 'cubicBezier':
      return `cubic-bezier(${(v as number[]).join(', ')})`;
    case 'typography': {
      const s = v as Typography;
      return `${s.fontFamily} · ${s.fontSize}/${s.lineHeight} · ${s.letterSpacing}`;
    }
    case 'border': {
      const b = v as Border;
      return `${b.width} px · ${b.color}`;
    }
    case 'spring': {
      const s = v as Spring;
      return `mass ${s.mass} · stiffness ${s.stiffness} · damping ${s.damping}`;
    }
    case 'shadow':
      return String(v).replace(/px/g, '');
    default:
      return typeof v === 'string' ? v : JSON.stringify(v);
  }
}

// WCAG 2.x relative luminance and contrast ratio.
const channel = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
export function luminance(color: string) {
  const [r, g, b] = [1, 3, 5].map((i) => channel(parseInt(color.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
export const readableOn = (bg: string) => (contrast(bg, hex('color.ink.100')) >= contrast(bg, hex('color.ink.900')) ? hex('color.ink.100') : hex('color.ink.900'));

/** A type role ready for the DOM: React Native uses unitless px, CSS needs 'px' on lineHeight. */
export function typeCss(role: 'balance' | 'headline' | 'title' | 'body' | 'label' | 'caption') {
  const t = tokens[`font.role.${role}`] as Typography;
  return { fontFamily: t.fontFamily, fontSize: t.fontSize, lineHeight: `${t.lineHeight}px`, letterSpacing: `${t.letterSpacing}px` };
}
