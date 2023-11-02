
const lowercaseUnderscore = (str) => {
  str = str.toLowerCase();
  str = str.replaceAll(' ', '_');
  return str;
}

const capitalizeSpaces = (str) => {
  let words = str.split('_');
  for(let i = 0; i < words.length; i++) {
    words[i] = words[0].toUpperCase() + words[0].substring(1);
  }
  return words.join(' ');
}

module.exports = {lowercaseUnderscore, capitalizeSpaces}