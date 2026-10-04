import { tokenMeta, tokens, typeCss, type TokenName } from './tokenUtils';

type Role = 'balance' | 'headline' | 'title' | 'body' | 'label' | 'caption';

/** A type role with its spec. */
export function TypeSpecimen({ role, children }: { role: Role; children: string }) {
  const name = `font.role.${role}` as TokenName;
  const style = tokens[name] as { fontFamily: string; fontSize: number; lineHeight: number; letterSpacing: number };
  const meta = tokenMeta.find((t) => t.name === name);
  const pct = Math.round((style.letterSpacing / style.fontSize) * 1000) / 10;
  return (
    <div className="vds-type">
      <div style={{ ...typeCss(role), color: tokens['color.text.primary'], overflowWrap: 'anywhere' }}>{children}</div>
      <div className="vds-type-spec">
        <code>{name}</code>
        <br />
        {style.fontFamily.replace(/_/g, ' ')}
        <br />
        {style.fontSize}/{style.lineHeight} px · tracking {pct > 0 ? '+' : ''}
        {pct}%
        <br />
        {meta?.description}
      </div>
    </div>
  );
}
