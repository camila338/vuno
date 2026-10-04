import { useMemo, useState } from 'react';
import { tokens, type TokenName } from './tokenUtils';

type Spring = { mass: number; stiffness: number; damping: number };

/** Simulates the spring (same parameters as Reanimated withSpring) and turns it into a CSS linear() curve. */
function simulate({ mass, stiffness, damping }: Spring) {
  let x = 0;
  let v = 0;
  let t = 0;
  let peak = 0;
  let settle = 0;
  // 0.1 ms steps so overshoot and settling match FOUNDATIONS §6; one point is kept per ms.
  const dt = 1 / 10000;
  const pts: number[] = [];
  for (let i = 1; t < 1.5; i++) {
    const a = (-stiffness * (x - 1) - damping * v) / mass;
    v += a * dt;
    x += v * dt;
    t += dt;
    if (i % 10 === 0) pts.push(x);
    peak = Math.max(peak, x);
    if (Math.abs(x - 1) > 0.01) settle = t;
  }
  const used = pts.slice(0, Math.round(settle * 1000));
  const stops = Array.from({ length: 49 }, (_, i) => (i === 48 ? 1 : i === 0 ? 0 : +used[Math.round((i / 48) * (used.length - 1))].toFixed(4)));
  return { css: `linear(${stops.join(', ')})`, ms: Math.round(settle * 1000), overshoot: (peak - 1) * 100, pts: used };
}

/** Spring curve and interactive demo. */
export function SpringDemo({ token }: { token: TokenName }) {
  const spring = tokens[token] as Spring;
  const sim = useMemo(() => simulate(spring), [spring]);
  const [end, setEnd] = useState(false);
  const W = 280;
  const H = 96;
  const max = 1.2;
  const points = sim.pts
    .filter((_, i) => i % 6 === 0)
    .map((y, i, a) => `${((i / (a.length - 1)) * W).toFixed(1)},${(H - (y / max) * H).toFixed(1)}`)
    .join(' ');
  return (
    <div className="vds-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <code>{token}</code>
          <div className="vds-ref" style={{ marginTop: 6 }}>
            mass {spring.mass} · stiffness {spring.stiffness} · damping {spring.damping}
          </div>
          <div className="vds-ref">
            overshoot ≈{sim.overshoot.toFixed(0)}% · settles (±1%) in ≈{sim.ms} ms
          </div>
        </div>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }} aria-label={`${token} curve`}>
          <line x1={0} x2={W} y1={H - H / max} y2={H - H / max} stroke="#E3E1DB" strokeDasharray="4 4" />
          <polyline points={points} fill="none" stroke="#5347D3" strokeWidth={2.5} strokeLinecap="round" />
        </svg>
      </div>
      <div className="vds-motion-stage">
        <div className="vds-motion-ball" style={{ left: end ? 'calc(100% - 60px)' : 12, transition: `left ${sim.ms}ms ${sim.css}` }} />
      </div>
      <button type="button" className="vds-button-ghost" onClick={() => setEnd((e) => !e)}>
        ▶ Play
      </button>
    </div>
  );
}

/** Button that scales to 0.96 while pressed and springs back with the given spring. */
export function PressDemo({ token, label = 'Press me' }: { token: TokenName; label?: string }) {
  const sim = useMemo(() => simulate(tokens[token] as Spring), [token]);
  const [down, setDown] = useState(false);
  const press = tokens['motion.duration.press'] as number;
  return (
    <button
      type="button"
      className="vds-mock-btn"
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      onPointerLeave={() => setDown(false)}
      style={{
        cursor: 'pointer',
        background: tokens['color.brand.primary'] as string,
        color: tokens['color.brand.on-primary'] as string,
        transform: down ? 'scale(0.96)' : 'scale(1)',
        transition: down ? `transform ${press}ms cubic-bezier(0.2, 0, 0, 1)` : `transform ${sim.ms}ms ${sim.css}`,
      }}
    >
      {label}
    </button>
  );
}
