export function getGreetingByHour(): string {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "Good Morning 🌅";
  if (hour >= 12 && hour < 16) return "Good Afternoon ☀️";
  if (hour >= 16 && hour < 20) return "Good Evening 🌇";
  return "Good Night 🌙";
}
