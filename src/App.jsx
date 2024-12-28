import { useState } from 'react';
import Button from "@mui/material/Button";
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [steamId, setSteamId] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  //修正
  const fetchData = async () => {
    try {
      const response = await fetch(`your-server-url?steamUserId=${steamId}`);
      const data = await response.json();
      setGames(data.games);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    fetchData();
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
