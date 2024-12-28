import { useState, useEffect } from 'react';
import Header from './components/Header';  // Headerコンポーネントをインポート

export default function App() {
  return (
    <div>
      <Header />  {/* Headerコンポーネントを表示 */}
      <main>
        <p>これはメインコンテンツです。</p>
      </main>
    </div>
  );
}
