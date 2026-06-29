import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Device({stats}) {       //stats is the props
  const deviceCount = stats.reduce((acc, item) => {
    // count of devices
    if (acc[item.device]) {
      acc[item.device] += 1;
    } else acc[item.device] = 1;

    return acc;
  }, {});

  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={result}
            labelLine={false}
            label={({ device, percent }) =>                 
              `${device}: ${(percent * 100).toFixed(0)}%`     // device(mobile) how much % is taken     
            }
            dataKey="count"
          >
            {result.map((_, index) => (                // map data to render
              <Cell                                    
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
