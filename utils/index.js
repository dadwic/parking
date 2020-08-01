export const getAllPossibleThreeLetterWords = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const arr = [];
  let text = "";
  for (let i = 0; i < chars.length; i++) {
    for (let x = 0; x < chars.length; x++) {
      for (let j = 0; j < chars.length; j++) {
        text += chars[i];
        text += chars[x];
        text += chars[j];
        arr.push(text);
        text = "";
      }
    }
  }
  return arr;
};
