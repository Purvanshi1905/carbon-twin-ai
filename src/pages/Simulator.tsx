import { useState } from "react";
import { Link } from "react-router-dom";

export default function Simulator() {
  const emissions = JSON.parse(
    localStorage.getItem("emissions") || "{}"
  );

  const [reduction, setReduction] = useState(20);

  const projectedTotal =
    emissions.total * (1 - reduction / 100);

  const savings =
    emissions.total - projectedTotal;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Future Simulator
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="mb-4">
          Reduce your transport footprint
        </p>

        <input
          type="range"
          min="0"
          max="100"
          value={reduction}
          onChange={(e) =>
            setReduction(Number(e.target.value))
          }
          className="w-full"
        />

        <p className="mt-4">
          Reduction: {reduction}%
        </p>

        <div className="mt-8 space-y-3">
          <p>
            Current: {emissions.total?.toFixed(1)} kg CO₂
          </p>

          <p>
            Projected: {projectedTotal.toFixed(1)} kg CO₂
          </p>

          <p className="text-emerald-400">
            Savings: {savings.toFixed(1)} kg CO₂
          </p>

          <Link
  to="/recommendations"
  className="inline-block mt-6 bg-emerald-500 px-6 py-3 rounded-lg text-slate-900 font-semibold"
>
  Get AI Recommendations
</Link>
        </div>
      </div>
    </div>
  );
}