import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Link, Navigate } from "react-router-dom";
import { toPng } from "html-to-image";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function Dashboard() {
  const emissions = JSON.parse(
    localStorage.getItem("emissions") || "{}"
  );

  if (!emissions.total) {
    return <Navigate to="/" replace />;
  }

  const data = [
    {
      name: "Transport",
      value: emissions.transport || 0,
    },
    {
      name: "Electricity",
      value: emissions.electricity || 0,
    },
    {
      name: "Food",
      value: emissions.food || 0,
    },
    {
      name: "Shopping",
      value: emissions.shopping || 0,
    },
    {
      name: "Waste",
      value: emissions.waste || 0,
    },
  ];

  const topContributor = data.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );

  const sustainabilityScore = Math.max(
    0,
    Math.round(100 - emissions.total / 5)
  );

  const downloadPassport = async () => {
  try {
    const passport = document.getElementById("passport");

    if (!passport) {
      alert("Unable to generate report.");
      return;
    }

    const dataUrl = await toPng(passport, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#0f172a",
    });

    const link = document.createElement("a");
    link.download = "Climate-Passport.png";
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download report.");
  }
};

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div
          id="passport"
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "8px",
            borderRadius: "16px",
          }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1
                className="text-4xl font-bold"
                style={{ color: "#34d399" }}
              >
                Your Carbon Twin
              </h1>

              <p
                className="mt-2"
                style={{ color: "#94a3b8" }}
              >
                Understand your footprint and discover
                opportunities to reduce it.
              </p>
            </div>

            <Link
              to="/"
              className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-lg text-center"
            >
              New Assessment
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="bg-slate-800 rounded-2xl p-6">
              <p className="text-slate-400 mb-2">
                Monthly Footprint
              </p>

              <h2
                className="text-4xl font-bold"
                style={{ color: "#34d399" }}
              >
                {emissions.total.toFixed(1)} kg
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                CO₂ equivalent
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6">
              <p className="text-slate-400 mb-2">
                Biggest Contributor
              </p>

              <h2 className="text-2xl font-bold">
                {topContributor.name}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {topContributor.value.toFixed(1)} kg CO₂
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6">
              <p className="text-slate-400 mb-2">
                Sustainability Score
              </p>

              <h2
                className="text-4xl font-bold"
                style={{ color: "#60a5fa" }}
              >
                {sustainabilityScore}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Out of 100
              </p>
            </div>
          </div>

          <div
  data-html2canvas-ignore="true"
  className="bg-slate-800 rounded-2xl p-6 mb-8"
>
            <h3 className="text-2xl font-semibold mb-6">
              Emission Breakdown
            </h3>

            <div className="h-96">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={140}
                    label
                  >
                    {data.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 mb-8">
            <h3 className="text-2xl font-semibold mb-4">
              Key Insight
            </h3>

            <p className="text-slate-300">
              Your highest emissions come from{" "}
              <span
                style={{
                  color: "#34d399",
                  fontWeight: 600,
                }}
              >
                {topContributor.name}
              </span>
              . Reducing this category can significantly
              lower your overall carbon footprint.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={downloadPassport}
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-4 rounded-xl"
          >
            Download Climate Passport
          </button>

          <Link
            to="/simulator"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-6 py-4 rounded-xl"
          >
            Explore Future Impact
          </Link>
        </div>
      </div>
    </div>
  );
}