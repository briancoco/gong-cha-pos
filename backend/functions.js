const toLowerUnderscore = (str) => {
    return str.replace(' ', '_').toLowerCase();

}

const toUpperSpace = (str) => {
    const words = str.split('_');

    let updatedString = '';
    words.forEach(word => {
        updatedString += word.charAt(0).toUpperCase() + word.slice(1) + ' ';

    });

    return updatedString.substring(0, updatedString.length-1);

}

module.exports = {
    toLowerUnderscore,
    toUpperSpace,
}