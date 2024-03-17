export const capitalizeFirst = (sentence: string) => {
  const words = sentence.split(" ");

  return words
    .map((word: string) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
};
