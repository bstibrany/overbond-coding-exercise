
const spread_calculator = require('../app/spread_calculator');
const fs = require('fs');

fs.readFile('data.csv', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    const strings_replaced = data.trim().replace(/(years)|\%| /g, '');
    const line_seperated = strings_replaced.split('\n');
    const value_seperated = line_seperated.slice(1).map(line => line.split(','));
    const input = value_seperated.map(line => line.map((val, i, arr) => (i > 1) ? parseInt(val) : val));

    if (data.includes("linear")) {
        console.log(spread_calculator.spread_linear(input));
    } else {
        console.log(spread_calculator.spread_nearest(input));
    }
});
