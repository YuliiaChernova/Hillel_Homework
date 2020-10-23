let counter = 0;

const doSum = require('./sum.js');
const doMult = require('./mult.js');
//const div = require('./div.js');
//const sub = require('./sub.js');

module.exports = {
    sum: doSum,
    mult: doMult,
    //div: div(),
    //sub: sub(),
}