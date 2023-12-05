// utilities/randomBorderGradientColor.ts
export const getRandomBorderGradientColor = () => {
  const gradientColorClasses = [
    "border-pink-purple",
    "border-green-blue",
    "border-yellow-green",
    "border-purple-indigo",
    "border-red-yellow",
  ];

  const randomIndex = Math.floor(Math.random() * gradientColorClasses.length);
  return gradientColorClasses[randomIndex];
};
