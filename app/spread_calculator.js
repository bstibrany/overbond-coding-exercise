
/*
 * Calculates the spread of a corporate bond relative to the
 * government bond which is closest in term.
 */
exports.spread_nearest = function(bonds) {

    const corporate_bonds = bonds.filter(bond => bond[1] == "corporate");
    const government_bonds = bonds.filter(bond => bond[1] == "government");

    for (let i = 0; i < corporate_bonds.length; i++) {

        let closest = {
            "bond": government_bonds[0][0],
            "distance": Math.abs(corporate_bonds[i][2] - government_bonds[0][2]),
            "yield": government_bonds[0][3],
        };
        for (let j = 0; j < government_bonds.length; j++) {
            if (Math.abs(corporate_bonds[i][2] - government_bonds[j][2]) < closest.distance) {
                closest.distance = Math.abs(corporate_bonds[i][2] - government_bonds[j][2]);
                closest.bond = government_bonds[j][0];
                closest.yield = government_bonds[j][3];
            }
        }

        corporate_bonds[i].closest = closest;
    }

    let output = "";
    for (let i = 0; i < corporate_bonds.length; i++) {
        if (i > 0) {
            output += "\n";
        }
        output += corporate_bonds[i][0] + "," + corporate_bonds[i].closest.bond + ","
                + (corporate_bonds[i][3] - corporate_bonds[i].closest.yield).toFixed(2) + "%";
    }

    return output;
}

/*
 * Calculates the spread of a corporate bond relative a linear interpolation
 * of the two closest government bonds.
 */
exports.spread_linear = function(bonds) {

    const corporate_bonds = bonds.filter(bond => bond[1] == "corporate");
    const government_bonds = bonds.filter(bond => bond[1] == "government");

    for (let i = 0; i < corporate_bonds.length; i++) {

        let left = {distance: Infinity};
        let right = {distance: Infinity};
        for (let j = 0; j < government_bonds.length; j++) {
            // Left side.
            if (Math.abs(corporate_bonds[i][2] - government_bonds[j][2]) < left.distance &&
                    corporate_bonds[i][2] > government_bonds[j][2]) {

                left.distance = Math.abs(corporate_bonds[i][2] - government_bonds[j][2]);
                left.bond = government_bonds[j][0];
                left.yield = government_bonds[j][3];
                left.term = government_bonds[j][2];
            }

            // Right side.
            if (Math.abs(corporate_bonds[i][2] - government_bonds[j][2]) < right.distance &&
                    corporate_bonds[i][2] < government_bonds[j][2]) {

                right.distance = Math.abs(corporate_bonds[i][2] - government_bonds[j][2]);
                right.bond = government_bonds[j][0];
                right.yield = government_bonds[j][3];
                right.term = government_bonds[j][2];
            }
        }

        const interp_yield = left.yield + ((corporate_bonds[i][2]-left.term) / (right.term-left.term))*(right.yield - left.yield);
        corporate_bonds[i].yield = corporate_bonds[i][3] - interp_yield;
    }

    let output = "";
    for (let i = 0; i < corporate_bonds.length; i++) {
        if (i > 0) {
            output += "\n";
        }
        output += corporate_bonds[i][0] + "," + corporate_bonds[i].yield.toFixed(2) + "%";
    }

    return output;
}
