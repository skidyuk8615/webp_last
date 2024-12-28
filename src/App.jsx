import { useState } from 'react';
import Button from "@mui/material/Button";
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [steamId, setSteamId] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!steamId) {
      setError("Steam IDを入力してください");
      return;
    }

    try {
      const response = await fetch(`/.netlify/functions/fetchSteamUserData?steamUserId=${steamId}`);

      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }

      const data = await response.json();
      setGames(data);

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div>
          <input
            className="input-id"
            type="text"
            placeholder="Steam IDを入力"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>送信</Button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
