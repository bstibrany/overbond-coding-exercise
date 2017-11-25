
const assert = require('assert');
const spread_calculator = require('../app/spread_calculator');

describe('Part 1', () => {
    it('successfully calcuates the example case', (done) => {
        let input = [
            ["C1", "corporate", 10.3, 5.30],
            ["G1", "government", 9.4, 3.70],
            ["G2", "government", 12, 4.80],
        ];
        assert.equal(spread_calculator.spread_nearest(input), "C1,G1,1.60%");
        done();
    });

    it('successfully calcuates a similar example with mulitple corporate bonds', (done) => {
        let input = [
            ["C1", "corporate", 10.3, 5.30],
            ["C2", "corporate", 9.5, 6],
            ["G1", "government", 9.4, 3.70],
            ["G2", "government", 12, 4.80],
        ];
        assert.equal(spread_calculator.spread_nearest(input), "C1,G1,1.60%\nC2,G1,2.30%");
        done();
    });
});

describe('Part 2', () => {
    it('successfully calcuates the example case', (done) => {
        let input = [
            ["C1", "corporate", 10.3, 5.30],
            ["C2", "corporate", 15.2, 8.30],
            ["G1", "government", 9.4, 3.70],
            ["G2", "government", 12, 4.80],
            ["G2", "government", 16.3, 5.50],
        ];
        assert.equal(spread_calculator.spread_linear(input), "C1,1.22%\nC2,2.98%");
        done();
    });
});
