import React, { useState, useEffect } from 'react';
import './index.css';
import MoveNotationTable from './MoveNotationTable';
import F2L from './F2L';
import OLL from './OLL';
import PLL from './PLL';
import ScrambleSidebar from './ScrambleSidebar';

export default function App() {
  useEffect(() => {
    document.title = "魔方CFOP公式練習網站";
  }, []);
  const [page, setPage] = useState(''); // 預設無頁面，顯示歡迎訊息

  return (
    <div className="app-container">
      {/* 左側側欄 */}
      <ScrambleSidebar />

      {/* 中間主內容區 */}
      <main className="main-content">
        <h1>CFOP 公式庫</h1>

        {/* 頁面選擇導航 */}
        <nav className="navbar">
          {['F2L', 'OLL', 'PLL'].map((name) => (
            <button
              key={name}
              className={`nav-button ${page === name ? 'active' : ''}`}
              onClick={() => setPage(name)}
              aria-pressed={page === name} // 無障礙屬性，提升可用性
            >
              {name} 公式庫
            </button>
          ))}
        </nav>

        {/* 內容區塊 */}
        <section className="content" style={{ marginTop: '1rem' }}>
          {page === '' ? (
            <div style={{ color: '#888', fontStyle: 'italic' }}>
              歡迎來到魔術方塊公式庫
            </div>
          ) : page === 'F2L' ? (
            <F2L />
          ) : page === 'OLL' ? (
            <OLL />
          ) : (
            <PLL />
          )}
        </section>
      </main>

      {/* 右側固定說明欄 */}
      <aside className="move-notation-table">
        <MoveNotationTable />
      </aside>
    </div>
  );
}
