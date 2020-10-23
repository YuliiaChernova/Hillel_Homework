module.exports = function(...args) {

    for (let arg of args) {
        counter *= arg;
    }

    return counter;
}