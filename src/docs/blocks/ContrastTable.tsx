import { pairsInUse, pairsProhibited } from '../contrast';
import { Icon } from './Icon';
import { Pill } from './Layout';
import { contrast, hex, tokenMeta } from './tokenUtils';

const refOf = (name: string) => tokenMeta.find((t) => t.name === name)?.ref ?? name.replace('color.', '');
const short = (name: string) => name.replace(/^color\./, '');

/** AA contrast table computed live from the tokens. Nothing is typed by hand. */
export function ContrastTable() {
  const rows = pairsInUse.map((p) => ({ ...p, ratio: contrast(hex(p.fg), hex(p.bg)) }));
  const passing = rows.filter((r) => r.ratio >= r.min).length;
  return (
    <>
      <div className="vds-meta" style={{ marginTop: 0 }}>
        <Pill tone={passing === rows.length ? 'ok' : 'bad'}>
          {passing} of {rows.length} pairs in use pass AA
        </Pill>
        <Pill>4.5:1 body text</Pill>
        <Pill>3:1 large text, icons, borders and focus</Pill>
      </div>
      <div className="vds-table-wrap">
        <table className="vds-table">
          <thead>
            <tr>
              <th />
              <th>Text / icon</th>
              <th>Background</th>
              <th>Use</th>
              <th>Ratio</th>
              <th>Minimum</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const ok = r.ratio >= r.min;
              return (
                <tr key={`${r.fg}-${r.bg}`}>
                  <td>
                    <span style={{ display: 'inline-grid', placeItems: 'center', width: 52, height: 32, borderRadius: 8, background: hex(r.bg), color: hex(r.fg), font: '700 14px/1 var(--vds-ui)', border: '1px solid rgba(20,20,17,.08)' }}>Aa</span>
                  </td>
                  <td>
                    <div className="vds-token">{short(r.fg)}</div>
                    <div className="vds-ref">{refOf(r.fg)}</div>
                  </td>
                  <td>
                    <div className="vds-token">{short(r.bg)}</div>
                    <div className="vds-ref">{refOf(r.bg)}</div>
                  </td>
                  <td className="is-muted">{r.use}</td>
                  <td>
                    <strong className="vds-value" style={{ color: 'var(--vds-text)' }}>{r.ratio.toFixed(2)}:1</strong>
                  </td>
                  <td className="vds-value">{r.min}:1</td>
                  <td>
                    <Pill tone={ok ? 'ok' : 'bad'}>
                      <Icon name={ok ? 'checkmark' : 'close'} size={14} />
                      {ok ? 'AA' : 'Fails'}
                    </Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Combinations that fail, and why they are not used. */
export function ProhibitedTable() {
  return (
    <div className="vds-table-wrap">
      <table className="vds-table">
        <thead>
          <tr>
            <th />
            <th>Combination</th>
            <th>Ratio</th>
            <th />
            <th>Why it is not used</th>
          </tr>
        </thead>
        <tbody>
          {pairsProhibited.map((p) => {
            const r = contrast(hex(p.fg), hex(p.bg));
            return (
              <tr key={`${p.fg}-${p.bg}`}>
                <td>
                  <span style={{ display: 'inline-grid', placeItems: 'center', width: 52, height: 32, borderRadius: 8, background: hex(p.bg), color: hex(p.fg), font: '700 14px/1 var(--vds-ui)', border: '1px solid rgba(20,20,17,.08)' }}>Aa</span>
                </td>
                <td>
                  <div style={{ font: '600 14px/20px var(--vds-ui)' }}>{p.use}</div>
                  <div className="vds-ref">
                    {short(p.fg)} on {short(p.bg)}
                  </div>
                </td>
                <td className="vds-value">{r.toFixed(2)}:1</td>
                <td>
                  <Pill tone={p.exempt ? 'warn' : 'bad'}>{p.exempt ? 'Exempt' : 'Fails'}</Pill>
                </td>
                <td className="is-muted">{p.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
