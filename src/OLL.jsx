import React, { useState } from 'react';
import { ollCases } from './ollData';

export default function OLLGrid() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDetail = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '1rem',
      padding: '1rem',
    }}>
      {ollCases.map(({ id, code, algorithm, detail }) => {
        const imgSrc = `/images/oll/${code}.png`;  // 圖片命名統一
        return (
          <div key={id} style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: '0.75rem',
            backgroundColor: '#fafafa',
            boxShadow: '0 2px 6px rgb(0 0 0 / 0.1)',
            cursor: 'pointer',
            userSelect: 'none',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{code}</div>
            <div style={{
              height: 100,
              marginBottom: 8,
              backgroundColor: '#eee',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <img src={imgSrc} alt={code} style={{ maxHeight: '100%', maxWidth: '100%' }} />
            </div>
            <div style={{ fontSize: 14, color: '#333', marginBottom: 6 }}>
              <strong>轉法：</strong>{algorithm || '尚未填寫'}
            </div>
          </div>
        );
      }
      )}
    </div>
  );
}
