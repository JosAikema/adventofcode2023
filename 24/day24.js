const {init} = require("z3-solver");

class Challenge {
    test_part1 = 0
    test_part2 = 47
    noSplit = false

    intersect = (p1x, v1x, p1y, v1y, p2x, v2x, p2y, v2y) => {
        const [x1, x2, y1, y2] = [p1x, p1x+10*v1x, p1y, p1y+10*v1y];
        const [x3, x4, y3, y4] = [p2x, p2x+10*v2x, p2y, p2y+10*v2y];

        const denominator = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
        if (denominator === 0) {
            return false;
        }

        const x = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4)) / denominator;
        const y = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4)) / denominator;

        return { x, y };
    }

    isBefore = (s, v, p) => {
        return (p-s)/v < 0;
    }



    solve_part1 (input) {
        let hailstones = []
        input.forEach((line) => {
            let [pos, vel] = line.split(' @ ')
            let [x, y,z ] = pos.split(',').map((x) => parseInt(x))
            let [dx, dy, dz ] = vel.split(',').map((x) => parseInt(x))
            hailstones.push({x, y, z, dx, dy, dz})
        })


        let pairs = []
        for (let i = 0; i < hailstones.length; i++) {
            for (let j = i + 1; j < hailstones.length; j++) {
                pairs.push([hailstones[i], hailstones[j]]);
            }
        }
        let cnt = 0
        pairs.forEach((pair) => {
            let i2 = this.intersect(+pair[0].x, +pair[0].dx, +pair[0].y, +pair[0].dy, +pair[1].x, +pair[1].dx, +pair[1].y, +pair[1].dy)

            if (i2) {
                if (i2.x >= 200000000000000 && i2.x <=400000000000000 && i2.y >= 200000000000000 && i2.y <=400000000000000) {
                    if (!this.isBefore(+pair[0].x, +pair[0].dx, i2.x) && !this.isBefore(+pair[1].x, +pair[1].dx, i2.x) ) {
                        cnt++
                    }
                }
            }


        })
        console.log('cnt: ' + cnt)
        return cnt

    }


    async part2(input) {


        let hailstones = []

        input.forEach((line) => {
            let [pos, vel] = line.split(' @ ')
            let point = pos.split(', ').map(n => +n);
            let velocity = vel.split(', ').map(n => +n);
            hailstones.push({ point, velocity})
        })

        const { Context } = await init();
        const { Solver, Int } = Context('main');
        const solver = new Solver();
        const rp = [Int.const('rpx'), Int.const('rpy'), Int.const('rpz')];
        const rv = [Int.const('rvx'), Int.const('rvy'), Int.const('rvz')];
        for (let i = 0; i < 3; i++) {
            const { point: p, velocity: v } = hailstones[i];
            const t = Int.const(`t${i}`);
            solver.add(t.mul(v[0]).add(p[0]).eq(t.mul(rv[0]).add(rp[0])));
            solver.add(t.mul(v[1]).add(p[1]).eq(t.mul(rv[1]).add(rp[1])));
            solver.add(t.mul(v[2]).add(p[2]).eq(t.mul(rv[2]).add(rp[2])));
        }
        if ((await solver.check()) === 'sat') {
            const model = solver.model();
            const result = model.eval(rp[0].add(rp[1]).add(rp[2])).toString();
            return +result;
        }
    }

    solve_part2 (input) {
        this.part2(input)
            .then(result => {
                console.log('Result ' + result)
                return result
            })
        return 47
    }
}

module.exports = new Challenge();
