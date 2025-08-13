// MoveNotationTable.jsx
import React from 'react';

const moves = [
  { code: 'U', desc: '頂層順時針轉90度', note: 'Up（頂層）' },
  { code: "U'", desc: '頂層逆時針轉90度', note: "U 的逆向" },
  { code: 'U2', desc: '頂層轉180度', note: '' },
  { code: 'Uw', desc: '頂層與中間層一起順時針轉90度', note: 'Up（頂層）+ 內層' },
  { code: "Uw'", desc: '頂層與中間層一起逆時針轉90度', note: "U 的逆向 + 內層" },

  { code: 'D', desc: '底層順時針轉90度', note: 'Down（底層）' },
  { code: "D'", desc: '底層逆時針轉90度', note: "D 的逆向" },
  { code: 'D2', desc: '底層轉180度', note: '' },
  { code: 'Dw', desc: '底層與中間層一起順時針轉90度', note: 'Down（底層）+ 內層' },
  { code: "Dw'", desc: '底層與中間層一起逆時針轉90度', note: "D 的逆向 + 內層" },

  { code: 'L', desc: '左層順時針轉90度', note: 'Left（左層）' },
  { code: "L'", desc: '左層逆時針轉90度', note: "L 的逆向" },
  { code: 'L2', desc: '左層轉180度', note: '' },
  { code: 'Lw', desc: '左層與中間層一起順時針轉90度', note: 'Left（左層）+ 內層' },
  { code: "Lw'", desc: '左層與中間層一起逆時針轉90度', note: "L 的逆向 + 內層" },

  { code: 'R', desc: '右層順時針轉90度', note: 'Right（右層）' },
  { code: "R'", desc: '右層逆時針轉90度', note: "R 的逆向" },
  { code: 'R2', desc: '右層轉180度', note: '' },
  { code: 'Rw', desc: '右層與中間層一起順時針轉90度', note: 'Right（右層）+ 內層' },
  { code: "Rw'", desc: '右層與中間層一起逆時針轉90度', note: "R 的逆向 + 內層" },

  { code: 'F', desc: '前層順時針轉90度', note: 'Front（前層）' },
  { code: "F'", desc: '前層逆時針轉90度', note: "F 的逆向" },
  { code: 'F2', desc: '前層轉180度', note: '' },
  { code: 'Fw', desc: '前層與中間層一起順時針轉90度', note: 'Front（前層）+ 內層' },
  { code: "Fw'", desc: '前層與中間層一起逆時針轉90度', note: "F 的逆向 + 內層" },

  { code: 'B', desc: '後層順時針轉90度', note: 'Back（後層）' },
  { code: "B'", desc: '後層逆時針轉90度', note: "B 的逆向" },
  { code: 'B2', desc: '後層轉180度', note: '' },
  { code: 'Bw', desc: '後層與中間層一起順時針轉90度', note: 'Back（後層）+ 內層' },
  { code: "Bw'", desc: '後層與中間層一起逆時針轉90度', note: "B 的逆向 + 內層" },
];

const explanations = [
  { symbol: `'`, desc: '代表為動作符號逆時針旋轉。例如：R\'' },
  { symbol: '2', desc: '代表所指的這個動作要旋轉180度，即轉動兩步(次)。例如：R2' },
  { symbol: 'w', desc: '代表所指的這個動作，一次要轉動兩層。例如：Rw' },
  { symbol: 'x,y,z', desc: '用小寫 x / y / z 去代表要直接轉動整顆，這是使用數學三維坐標系的概念。 ' },
];

export default function MoveNotationTable() {
  return (
    <aside
      style={{
        position: 'fixed',
        top: '1rem',
        right: 0,
        width: 320,
        maxHeight: '80vh',
        overflowY: 'auto',
        backgroundColor: '#fff',
        borderLeft: '1px solid #ddd',
        padding: '14px',
        boxShadow: 'rgba(0,0,0,0.1) -2px 0 8px',
        zIndex: 1000,
      }}
    >
      <h2 style={{ fontWeight: '700', fontSize: 18, marginBottom: 12, textAlign: 'center' }}>
        魔方轉動代號
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ textAlign: 'left', padding: 6 }}>代號</th>
            <th style={{ textAlign: 'left', padding: 6 }}>描述</th>
            <th style={{ textAlign: 'left', padding: 6 }}>備註</th>
          </tr>
        </thead>
        <tbody>
          {moves.map(({ code, desc, note }) => (
            <tr key={code} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 6, fontWeight: 'bold' }}>{code}</td>
              <td style={{ padding: 6 }}>{desc}</td>
              <td style={{ padding: 6, fontStyle: 'italic', color: '#666' }}>{note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 8, fontWeight: '600' }}>說明</h3>
        <ul style={{ paddingLeft: 20, fontSize: 13, color: '#555', margin: 0 }}>
          {explanations.map(({ symbol, desc }) => (
            <li key={symbol}>
              <strong>{symbol}</strong> ：{desc}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}