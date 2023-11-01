
const lowercaseUnderscore = (str) => {
  str = str.toLowerCase();
  str = str.replaceAll(' ', '_');
  return str;
}

module.exports = {lowercaseUnderscore}