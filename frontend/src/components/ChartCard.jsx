import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

export default function ChartCard({ title, labels, data, type = "bar" }) {
  const colors = [
    "#6366f1", // indigo
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#f59e0b", // amber
    "#10b981", // emerald
    "#3b82f6", // blue
    "#ef4444", // red
    "#06b6d4", // cyan
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: type === "doughnut" ? colors : colors[0],
        borderColor: type === "doughnut" ? "white" : undefined,
        borderWidth: type === "doughnut" ? 2 : 0,
        borderRadius: type === "bar" ? 8 : undefined,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: type === "doughnut",
        position: "bottom",
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
      },
    },
    scales:
      type === "bar"
        ? {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
              ticks: {
                font: {
                  size: 11,
                  family: "'Inter', sans-serif",
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 11,
                  family: "'Inter', sans-serif",
                },
              },
            },
          }
        : undefined,
  };

  return (
    <div className="glass-card p-6 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
        {title}
      </h3>
      <div
        className="relative"
        style={{ height: type === "doughnut" ? "300px" : "250px" }}
      >
        {type === "doughnut" ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
