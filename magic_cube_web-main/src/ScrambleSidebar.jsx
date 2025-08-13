import React, { useEffect, useState, useCallback, useRef } from 'react';
import { randomScrambleForEvent } from 'https://cdn.cubing.net/v0/js/cubing/scramble';

export default function ScrambleSidebar() {
  const [scramble, setScramble] = useState('');
  const [loading, setLoading] = useState(false);
  const [eventId] = useState('333');  // 固定3x3
  const [moveCount, setMoveCount] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const playerRef = useRef(null);

  const generate = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const s = await randomScrambleForEvent(eventId);
      const scrambleText = Array.isArray(s) ? s.join(' ') : String(s);
      setScramble(scrambleText);

      // 計算步數（空白分隔符）
      const moves = scrambleText.trim().split(/\s+/).length;
      setMoveCount(moves);
    } catch (e) {
      console.error(e);
      setScramble('打亂產生失敗');
      setErrorMsg('打亂產生失敗');
      setMoveCount(null);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    generate();
  }, [generate]);

  // 載入 twisty-player
  useEffect(() => {
    if (!document.getElementById('twisty-player-script')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@cubing/twisty-player@1.6.0/dist/twisty-player.min.js';
      script.id = 'twisty-player-script';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // 產生視覺化 3x3
  useEffect(() => {
    if (scramble && playerRef.current) {
      playerRef.current.innerHTML = '';
      const player = document.createElement('twisty-player');
      player.setAttribute('puzzle', '3x3x3');
      player.setAttribute('alg', scramble);
      player.setAttribute('experimental-setup-alg', '');
      player.setAttribute('viewer-link', 'none');
      player.setAttribute('background', 'none');
      player.style.width = '220px';
      player.style.height = '220px';
      playerRef.current.appendChild(player);
    }
  }, [scramble]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(scramble);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = scramble;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };

  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 320,
        padding: '14px 14px 18px',
        borderRight: '1px solid #e5e7eb',
        background: '#fff',
        overflowY: 'auto',
        zIndex: 1000,
        boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>
        3x3 WCA 打亂
      </div>

      <div
        style={{
          padding: 10,
          border: '1px dashed #c7d2fe',
          background: '#eef2ff',
          borderRadius: 10,
          minHeight: 60,
          fontFamily: 'monospace',
          fontSize: 13,
          marginBottom: 10,
        }}
      >
        {loading ? '產生中…' : scramble}
      </div>

      <div ref={playerRef} style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }} />

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={generate}
          disabled={loading}
          style={{
            flex: 1,
            padding: '8px 10px',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          新打亂
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!scramble}
          style={{
            padding: '8px 10px',
            background: '#111827',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            minWidth: 70,
          }}
        >
          複製
        </button>
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
        {eventId === '333' && !loading && !errorMsg ? (
          <>步數：{moveCount}（WCA 常見為 25 左右，實際由 random-state 決定）</>
        ) : (
          <>步數：{!loading && !errorMsg ? moveCount : '—'}</>
        )}
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: '#6b7280' }}>
        小提醒：這是 <strong>random-state</strong> 產生法，能等機率抽到任何合法狀態。
      </div>
    </aside>
  );
}
