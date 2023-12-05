export const getRandomBorderColor = () => {
  const colors = [
    "border-green",
    "border-blue",
    "border-purple",
    "border-a1",
    "border-a2",
    "border-a3",
    "border-a4",
    "border-a5",
    "border-a6",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
