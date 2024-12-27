import React, { useState } from "react";

const App = () => {
  const [steamId, setSteamId] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  const fetchGames = async () => {
    setError("");
    setGames([]);

    try {
      const response = await fetch(`/.netlify/functions/fetchSteamUserData?steamUserId=${steamId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ steamId }),
      });

      if (!response.ok) {
        throw new Error("サーバーからのレスポンスが不正です");
      }

      const data = await response.json();
      setGames(data);
    } catch (err) {
      console.error("Failed to fetch games:", err);
      setError(err.message || "ゲームデータの取得に失敗しました");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Steamゲームデータ取得</h1>
      <input
        type="text"
        placeholder="Steam IDを入力"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
        style={{ padding: "8px", marginRight: "10px", width: "300px" }}
      />
      <button onClick={fetchGames} style={{ padding: "8px 16px" }}>
        ゲームデータを取得
      </button>

      {error && <p style={{ color: "red" }}>エラー: {error}</p>}

      {games.length > 0 && (
        <div>
          <h2>ゲームリスト</h2>
          <ul>
            {games.map((game) => (
              <li key={game.appid}>
                <strong>{game.name}</strong> - プレイ時間: {game.playtime}分
                {game.img_logo_url && (
                  <img
                    src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`}
                    alt={game.name}
                    style={{ width: "100px", marginLeft: "10px" }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
