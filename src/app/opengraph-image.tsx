import { ImageResponse } from 'next/og';

export const alt = 'Jawad Yazbek, full-stack developer. Complex systems. Useful software.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#111112',
          color: '#ededee',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 600 }}>
          Jawad<span style={{ color: '#df8d55' }}>.dev</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04 }}>Complex systems.</div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04, color: '#a3a3a9' }}>
            Useful software.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#a3a3a9' }}>
          Jawad Yazbek&nbsp;&nbsp;<span style={{ color: '#df8d55' }}>/</span>&nbsp;&nbsp;Full-stack developer, Laravel, React &amp;
          Next.js
        </div>
      </div>
    ),
    size,
  );
}
