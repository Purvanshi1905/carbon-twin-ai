import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { calculateCarbon } from "../utils/calculateCarbon";

type FormData = {
  transport_km: number;
  electricity_kwh: number;
  meat_meals: number;
  shopping_score: number;
  waste_score: number;
};

export default function Assessment() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      transport_km: Number(data.transport_km),
      electricity_kwh: Number(data.electricity_kwh),
      meat_meals: Number(data.meat_meals),
      shopping_score: Number(data.shopping_score),
      waste_score: Number(data.waste_score),
    };

    const emissions = calculateCarbon(formattedData);

    localStorage.setItem(
      "emissions",
      JSON.stringify(emissions)
    );

    const { error } = await supabase.from("assessments").insert({
      ...formattedData,
      total_emissions: emissions.total,
    });

    if (error) {
      console.error("Supabase error:", error);
      alert(JSON.stringify(error));
console.error(error);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-emerald-400">
            Carbon Twin AI
          </h1>

          <p className="text-slate-400 mt-3">
            Meet your Carbon Twin: visualize your future environmental impact and discover your highest-impact lifestyle changes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-800 rounded-2xl p-8 space-y-6 shadow-lg"
        >
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Weekly car travel (km)
            </label>

            <input
              type="number"
              min="0"
              required
              {...register("transport_km", {
                valueAsNumber: true,
              })}
              className="w-full rounded-lg bg-slate-700 p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. 100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Monthly electricity usage (kWh)
            </label>

            <input
              type="number"
              min="0"
              required
              {...register("electricity_kwh", {
                valueAsNumber: true,
              })}
              className="w-full rounded-lg bg-slate-700 p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. 250"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Meat-based meals per week
            </label>

            <input
              type="number"
              min="0"
              required
              {...register("meat_meals", {
                valueAsNumber: true,
              })}
              className="w-full rounded-lg bg-slate-700 p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. 7"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Non-essential shopping frequency
            </label>

            <select
              required
              {...register("shopping_score", {
                valueAsNumber: true,
              })}
              className="w-full rounded-lg bg-slate-700 p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select an option</option>
              <option value="1">Rarely</option>
              <option value="2">Sometimes</option>
              <option value="3">Frequently</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Recycling habits
            </label>

            <select
              required
              {...register("waste_score", {
                valueAsNumber: true,
              })}
              className="w-full rounded-lg bg-slate-700 p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select an option</option>
              <option value="1">Always recycle</option>
              <option value="2">Sometimes recycle</option>
              <option value="3">Never recycle</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-emerald-500 py-3 font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:opacity-50"
          >
            {isSubmitting
              ? "Generating Carbon Twin..."
              : "Generate Carbon Twin"}
          </button>
        </form>
      </div>
    </div>
  );
}