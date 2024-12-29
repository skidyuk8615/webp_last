import { PieChart, Pie } from 'recharts';

export default function DisplayPieChart({ data }) {
  const top7 = data.slice(0, 7);
  const otherGames = data.slice(7);

  const otherPlaytime = otherGames.reduce((total, game) => total + game.playtime, 0);

  // 新しい配色
  const gradientColors = [
    '#d74b2a',
    '#f0804b',
    '#f7b746',
    '#f5c02e',  // 変更した色
    '#91c453',
    '#55bfa6',
    '#51a7d1',
  ];

  const chartData = [
    ...top7.map((game, index) => ({
      name: game.name,
      playtime: game.playtime,
      fill: gradientColors[index] || '#66b3ff',
    })),
    { name: 'その他', playtime: otherPlaytime, fill: '#888888' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2>ゲームプレイ時間</h2>
        <PieChart width={1000} height={400}>
          <Pie
            data={chartData}
            dataKey="playtime"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            startAngle={90}
            endAngle={-270}
            label={({ name }) => name}
          />
        </PieChart>
      </div>
    </div>
  );
};
