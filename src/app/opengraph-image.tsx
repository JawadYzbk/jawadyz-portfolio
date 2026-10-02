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
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 80,
          background: '#ffffff',
          color: '#1d1d1f',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 600 }}>
          Jawad.dev
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1.05 }}>Complex systems.</div>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1.05 }}>
            Useful software.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#707070' }}>
          Jawad Yazbek, full-stack developer
        </div>
      </div>
    ),
    size,
  );
}
