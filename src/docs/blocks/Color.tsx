import { readableOn, selectTokens, tokenMeta, type TokenName, hex } from './tokenUtils';

const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

/** A color token: swatch, name and value. */
export function ColorSwatch({ name, label }: { name: TokenName; label?: string }) {
  const meta = tokenMeta.find((t) => t.name === name);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span className="vds-swatch-chip" style={{ background: hex(name) }} />
      <div>
        <div style={{ font: '600 14px/20px var(--vds-ui)', color: 'var(--vds-text)' }}>{label ?? name}</div>
        <div className="vds-ref">
          {hex(name)}
          {meta?.ref ? ` · ${meta.ref}` : ''}
        </div>
      </div>
    </div>
  );
}

/** 100–900 ramp of a primitive family. Marks the base (500) and the steps the semantic layer uses. */
export function ColorRamp({ family }: { family: string }) {
  const used = new Set(selectTokens({ layer: 'semantic', prefix: 'color.' }).map((t) => t.ref));
  const description = tokenMeta.find((t) => t.name === `color.${family}.500`)?.description;
  return (
    <div>
      <div className="vds-ramp-head">
        <code>color.{family}</code>
        <span>{description}</span>
      </div>
      <div className="vds-ramp">
        {STEPS.map((s) => {
          const name = `color.${family}.${s}` as TokenName;
          const bg = hex(name);
          return (
            <div key={s} className={`vds-ramp-step${s === 500 ? ' is-base' : ''}`} style={{ background: bg, color: readableOn(bg) }} title={name}>
              <b>{s}</b>
              <span>
                {bg.slice(1)}
                {used.has(name) ? ' ●' : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
