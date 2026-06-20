import { useEffect, useState } from "react";
import { getRecommendations } from "../services/gemini";

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState("");

  const [loading, setLoading] = useState(true);

  const emissions = JSON.parse(
    localStorage.getItem("emissions") || "{}"
  );

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const result = await getRecommendations(
          emissions
        );

        setRecommendations(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-400 mb-6">
          AI Recommendations
        </h1>

        <div className="bg-slate-800 rounded-2xl p-6">
          {loading ? (
            <p>Generating recommendations...</p>
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-slate-300">
              {recommendations}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}