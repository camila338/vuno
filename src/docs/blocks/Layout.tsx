import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './Icon';

/** Fixed page header: eyebrow, title, purpose and metadata. */
export function PageHeader({ eyebrow, title, children, meta }: { eyebrow: string; title: string; children: ReactNode; meta?: ReactNode }) {
  return (
    <header className="vds-header">
      <div className="vds-eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <div className="vds-lead">{children}</div>
      {meta ? <div className="vds-meta">{meta}</div> : null}
    </header>
  );
}

export function Pill({ children, tone }: { children: ReactNode; tone?: 'primary' | 'ok' | 'bad' | 'warn' }) {
  return <span className={`vds-pill${tone ? ` is-${tone}` : ''}`}>{children}</span>;
}

export function Grid({ children, min = 240 }: { children: ReactNode; min?: number }) {
  return (
    <div className="vds-grid" style={{ '--vds-min': `${min}px` } as CSSProperties}>
      {children}
    </div>
  );
}

/** Link to another docs page. `to` is the Storybook id, e.g. "foundations-color--docs". */
export function LinkCard({ to, title, children, icon, tone = '#E0E3FE', iconColor = '#4034AC', badge }: { to?: string; title: string; children: ReactNode; icon?: string; tone?: string; iconColor?: string; badge?: ReactNode }) {
  const body = (
    <>
      {icon ? (
        <span className="vds-icon-badge" style={{ background: tone, color: iconColor }}>
          <Icon name={icon} size={20} />
        </span>
      ) : null}
      <h4>
        {title}
        {badge ?? (to ? <Icon name="arrowForward" size={16} /> : null)}
      </h4>
      <div className="vds-card-text">{children}</div>
    </>
  );
  return to ? (
    <a className="vds-link-card" href={`./?path=/docs/${to}`} target="_top">
      {body}
    </a>
  ) : (
    <div className="vds-link-card">{body}</div>
  );
}

export function Callout({ children, tone }: { children: ReactNode; tone?: 'warn' }) {
  return (
    <div className={`vds-callout${tone ? ` is-${tone}` : ''}`}>
      <Icon name={tone === 'warn' ? 'alertCircle' : 'informationCircle'} size={20} />
      <div>{children}</div>
    </div>
  );
}

export function Canvas({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="vds-canvas" style={style}>
      {children}
    </div>
  );
}

/** Catalog card: preview, name, status, description and the tokens it uses. */
export function CatalogCard({ title, status = 'Planned', tone = 'warn', preview, children, tokens: tokenList, to }: { title: string; status?: string; tone?: 'primary' | 'ok' | 'bad' | 'warn'; preview: ReactNode; children: ReactNode; tokens?: string[]; to?: string }) {
  const body = (
    <>
      <div className="vds-catalog-preview">{preview}</div>
      <div className="vds-catalog-body">
        <div className="vds-catalog-title">
          <h4>{title}</h4>
          <Pill tone={tone}>{status}</Pill>
        </div>
        <div className="vds-card-text">{children}</div>
        {tokenList ? (
          <div className="vds-catalog-tokens">
            {tokenList.map((t) => (
              <code key={t}>{t}</code>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
  // `to`: Storybook id of the component's page, e.g. "componentes-button--docs".
  return to ? (
    <a className="vds-catalog is-link" href={`./?path=/docs/${to}`} target="_top">
      {body}
    </a>
  ) : (
    <div className="vds-catalog">{body}</div>
  );
}
