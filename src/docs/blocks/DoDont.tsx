import type { ReactNode } from 'react';
import { Icon } from './Icon';

// Same anatomy as Vibe's component rules: the example on a soft stage, then a
// green/red square badge with "Do" / "Don't" and a one-line rule underneath.
function Item({ kind, caption, children }: { kind: 'do' | 'dont'; caption: ReactNode; children: ReactNode }) {
  return (
    <figure className={`vds-dd-item is-${kind}`}>
      <div className="vds-dd-stage">{children}</div>
      <div className="vds-dd-label">
        <span className="vds-dd-badge">
          <Icon name={kind === 'do' ? 'checkmark' : 'close'} size={14} />
        </span>
        {kind === 'do' ? 'Do' : "Don't"}
      </div>
      <figcaption className="vds-dd-caption">{caption}</figcaption>
    </figure>
  );
}

export const Do = (props: { caption: ReactNode; children: ReactNode }) => <Item kind="do" {...props} />;
export const Dont = (props: { caption: ReactNode; children: ReactNode }) => <Item kind="dont" {...props} />;

/** A Do / Don't pair with rendered examples. Usage: <DoDont><Do …/><Dont …/></DoDont> */
export function DoDont({ children }: { children: ReactNode }) {
  return <div className="vds-dd">{children}</div>;
}

/** The same component side by side on iOS and Android, each with its platform rule. */
export function PlatformPair({ ios, android, iosCaption, androidCaption }: { ios: ReactNode; android: ReactNode; iosCaption: ReactNode; androidCaption: ReactNode }) {
  return (
    <div className="vds-dd">
      {[
        ['ios', 'logoApple', 'iOS', ios, iosCaption],
        ['android', 'logoAndroid', 'Android', android, androidCaption],
      ].map(([key, icon, label, node, caption]) => (
        <figure key={key as string} className="vds-dd-item is-platform">
          <div className="vds-dd-stage">{node}</div>
          <div className="vds-dd-label">
            <span className="vds-dd-badge">
              <Icon name={icon as string} size={14} />
            </span>
            {label}
          </div>
          <figcaption className="vds-dd-caption">{caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
