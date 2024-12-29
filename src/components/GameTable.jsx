export default function GameTable({ games }) {
  return (
    <div>
      <h3>ゲーム詳細</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>アイコン</th>
              <th>ゲーム名</th>
              <th>プレイ時間</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.appid}>
                <td>
                  <img
                    src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                    alt={game.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td>
                  <a
                    href={`https://store.steampowered.com/app/${game.appid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {game.name}
                  </a>
                </td>
                <td>{game.playtime} 時間</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
