import { useState, type ReactNode } from 'react';
import { formatValue, selectTokens, type TokenMeta } from './tokenUtils';

type Preview = 'color' | 'space' | 'radius' | 'shadow' | 'type' | 'border' | 'none' | 'auto';

/** For component tokens, whose types are mixed: pick the preview from the token type and name. */
function autoPreview(t: TokenMeta): Preview {
  switch (t.type) {
    case 'color':
      return 'color';
    case 'shadow':
      return 'shadow';
    case 'border':
      return 'border';
    case 'typography':
      return 'type';
    case 'dimension':
      return /radius/.test(t.name) ? 'radius' : 'space';
    default:
      return 'none';
  }
}

function PreviewCell({ token, preview }: { token: TokenMeta; preview: Preview }) {
  const v = token.value as never;
  switch (preview === 'auto' ? autoPreview(token) : preview) {
    case 'color':
      return <span className="vds-swatch-chip" style={{ background: v as string, display: 'inline-block' }} />;
    case 'space':
      return <span style={{ display: 'inline-block', height: 12, width: Math.min(v as number, 72), background: '#5347D3', borderRadius: 3 }} />;
    case 'radius':
      return <span style={{ display: 'inline-block', width: 48, height: 48, border: '2px solid #141411', borderRadius: Math.min(v as number, 24), background: '#F8F7F1' }} />;
    case 'shadow':
      return <span style={{ display: 'inline-block', width: 72, height: 44, borderRadius: 12, background: '#F8F7F1', boxShadow: v }} />;
    case 'border': {
      const b = v as { width: number; color: string };
      return <span style={{ display: 'inline-block', width: 72, height: 36, borderRadius: 12, background: '#F8F7F1', border: `${b.width}px solid ${b.color}` }} />;
    }
    case 'type': {
      const s = v as { fontFamily: string; fontSize: number; lineHeight: number; letterSpacing: number };
      return <span style={{ fontFamily: s.fontFamily, fontSize: Math.min(s.fontSize, 32), lineHeight: 1.1, letterSpacing: s.letterSpacing, color: '#141411' }}>Aa</span>;
    }
    default:
      return null;
  }
}

function CopyName({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="vds-token"
      title="Copy name"
      onClick={() => {
        navigator.clipboard?.writeText(name).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        });
      }}
    >
      {copied ? 'Copied ✓' : name}
    </button>
  );
}

/**
 * Token table generated from src/theme/tokens.meta.ts (built from tokens/*.json).
 * Columns: name, value (and the primitive it points to), usage.
 */
export function TokenTable({
  prefix,
  names,
  layer,
  exclude,
  preview = 'none',
  caption,
}: {
  prefix?: string;
  names?: string[];
  layer?: TokenMeta['layer'];
  exclude?: string;
  preview?: Preview;
  caption?: ReactNode;
}) {
  const rows = selectTokens({ prefix, names, layer, exclude });
  return (
    <div className="vds-table-wrap">
      <table className="vds-table">
        {caption ? <caption style={{ textAlign: 'left', padding: '12px 16px', font: '400 13px/18px var(--vds-ui)', color: 'var(--vds-text-3)' }}>{caption}</caption> : null}
        <thead>
          <tr>
            {preview !== 'none' ? <th style={{ width: 88 }} /> : null}
            <th>Token</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.name}>
              {preview !== 'none' ? (
                <td>
                  <PreviewCell token={t} preview={preview} />
                </td>
              ) : null}
              <td>
                <CopyName name={t.name} />
              </td>
              <td>
                <div className="vds-value">{formatValue(t)}</div>
                {t.ref ? <div className="vds-ref">→ {t.ref}</div> : null}
              </td>
              <td className="is-muted">{t.description ?? (t.layer === 'primitive' ? 'Primitive: used through a semantic token.' : '—')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
