import { PieChart, Pie, } from 'recharts';

const DisplayPieChart = ({ data }) => {
  //console.log(data);
  return (
    <div>
      <h2>ゲームプレイ時間Top10</h2>
      <PieChart width={1000} height={400}>
        <Pie data={data} dataKey="playtime" nameKey="name" cx="50%" cy="50%" outerRadius={150} label={({ name }) => name} />
      </PieChart>
    </div>
  );
};

export default DisplayPieChart;
