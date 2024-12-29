import { useState } from 'react';
import Button from "@mui/material/Button";
import Header from './components/Header';
import Footer from './components/Footer';
import DisplayPieChart from './components/DisplayPieChart';

export default function App() {
  const [steamId, setSteamId] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(`/.netlify/functions/fetchSteamUserData?steamUserId=${steamId}`);
      const data = await response.json();
      const topGames = data.sort((a, b) => b.playtime - a.playtime).slice(0, 10);
      setGames(topGames);
    } catch (error) {
      console.error('Error fetching data:', error);
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
          <Button variant="contained" onClick={handleClick}>
            送信
          </Button>
        </div>

        {games.length > 0 && <DisplayPieChart data={games} />}
      </main>
      <Footer />
    </div>
  );
}
