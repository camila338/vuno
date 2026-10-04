import * as ionicons from 'ionicons/icons';
import type { CSSProperties } from 'react';

type IconName = keyof typeof ionicons;

// Ionicons SVGs rely on their stylesheet (stroke and fill);
// it is inlined here so the mask gets the right shape.
const ICON_CSS = '<style>.ionicon{fill:#000;stroke:#000}.ionicon-fill-none{fill:none}.ionicon-stroke-width{stroke-width:32px}</style>';
const cache = new Map<string, string>();
function maskUrl(name: string) {
  if (!cache.has(name)) {
    const raw = (ionicons as Record<string, string>)[name] ?? '';
    const svg = raw.replace(/^data:image\/svg\+xml;utf8,/, '').replace(/(<svg[^>]*>)/, `$1${ICON_CSS}`);
    cache.set(name, `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`);
  }
  return cache.get(name)!;
}

/**
 * Ionicons icon (the library in FOUNDATIONS §7) for docs pages.
 * Uses a CSS mask to inherit `color`, like the app.
 */
export function Icon({ name, size = 24, style, label }: { name: IconName | string; size?: number; style?: CSSProperties; label?: string }) {
  const url = maskUrl(name);
  return (
    <span
      className="vds-icon"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ width: size, height: size, WebkitMaskImage: url, maskImage: url, ...style }}
    />
  );
}

/** Rest / active pairs: the outline and filled variants of the same icon. */
export function IconGrid({ names }: { names: string[] }) {
  return (
    <div className="vds-icon-grid">
      {names.map((n) => (
        <div key={n} className="vds-icon-cell">
          <div className="pair">
            <Icon name={`${n}Outline`} label={`${n} outline`} />
            <Icon name={n} label={`${n} relleno`} />
          </div>
          <span className="name">{n.replace(/([A-Z])/g, '-$1').toLowerCase()}</span>
        </div>
      ))}
    </div>
  );
}
