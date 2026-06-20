import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function getRecommendations(emissions: any) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an environmental sustainability expert.

Here is a user's monthly carbon footprint:

Transport: ${emissions.transport.toFixed(1)} kg CO₂
Electricity: ${emissions.electricity.toFixed(1)} kg CO₂
Food: ${emissions.food.toFixed(1)} kg CO₂
Shopping: ${emissions.shopping.toFixed(1)} kg CO₂
Waste: ${emissions.waste.toFixed(1)} kg CO₂

Provide exactly 3 personalized recommendations.

For each recommendation include:

- Action title
- Estimated annual carbon savings
- Estimated money savings
- Difficulty level (Easy, Medium, Hard)

Keep the response concise and user-friendly.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}
