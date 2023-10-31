const toLowerUnderscore = (str) => {
    return str.replace(' ', '_').toLowerCase();

}

const toUpperSpace = (str) => {
    return str.replace('_', ' ').toUpperCase();

}



module.exports = {
    toLowerUnderscore,
    toUpperSpace,
}