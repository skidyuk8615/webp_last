import { PieChart, Pie } from 'recharts';

export default function DisplayPieChart({ data }) {
  return (
    <div>
      <h2>ゲームプレイ時間Top10</h2>
      <PieChart width={1000} height={400}>
        <Pie
          data={data}
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
  );
};
