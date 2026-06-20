export function calculateCarbon(data: any) {
  const transport = data.transport_km * 0.192;
  const electricity = data.electricity_kwh * 0.82;
  const food = data.meat_meals * 7;
  const shopping = data.shopping_score * 15;
  const waste = data.waste_score * 10;

  return {
    transport,
    electricity,
    food,
    shopping,
    waste,
    total:
      transport +
      electricity +
      food +
      shopping +
      waste,
  };
}