import React from 'react';

export const Skeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-sm)',
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`skeleton-box ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

export const CardSkeleton = ({ count = 3 }) => {
  return (
    <div className="skeleton-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.25rem', width: '100%' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="civic-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton width="90px" height="24px" borderRadius="999px" />
            <Skeleton width="70px" height="20px" borderRadius="999px" />
          </div>
          <Skeleton width="80%" height="22px" />
          <Skeleton width="100%" height="16px" />
          <Skeleton width="60%" height="16px" />
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton width="100px" height="16px" />
            <Skeleton width="80px" height="32px" borderRadius="6px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const TableRowSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx}>
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx} style={{ padding: '1rem' }}>
              <Skeleton width={cIdx === 1 ? '160px' : cIdx === 0 ? '80px' : '90px'} height="18px" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export const StatCardSkeleton = ({ count = 4 }) => {
  return (
    <div className="stats-grid">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="stat-tile">
          <Skeleton width="48px" height="48px" borderRadius="10px" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <Skeleton width="60px" height="28px" />
            <Skeleton width="110px" height="14px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
