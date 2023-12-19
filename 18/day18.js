class Challenge {
    test_part1 = 62
    test_part2 = 952408144115
    noSplit = false

    solve_part1 (input) {
        let r = 0;
        let c = 0;
        let sum = 1;
        input.forEach((line) => {

            let [direction, count, colorcode] = line.split(' ')
            count = +count;

            let dr = 0
            let dc = 0
            switch (direction) {
                case 'U':
                    dr = -1
                    dc = 0
                    break;
                case 'D':
                    dr = 1
                    dc = 0
                    break;
                case 'L':
                    dr = 0
                    dc = -1
                    break;
                case 'R':
                    dr = 0
                    dc = 1
                    break;
            }
            const r0 = r;
            const c0 = c;
            r += dr * count;
            c += dc * count;
            sum += (r * c0 - r0 * c + count) / 2;
        })

        return sum;
    }


    solve_part2 (input) {

        let r = 0;
        let c = 0;
        let sum = 1;
        input.forEach((line) => {

            let [direction, count, colorcode] = line.split(' ')
            let color = colorcode.slice(1, -1)

            direction = ['R', 'D', 'L', 'U'][color.at(-1)];
            count = parseInt(color.slice(1, -1), 16);


            let dr = 0
            let dc = 0
            switch (direction) {
                case 'U':
                    dr = -1
                    dc = 0
                    break;
                case 'D':
                    dr = 1
                    dc = 0
                    break;
                case 'L':
                    dr = 0
                    dc = -1
                    break;
                case 'R':
                    dr = 0
                    dc = 1
                    break;
            }
            const r0 = r;
            const c0 = c;
            r += dr * count;
            c += dc * count;
            sum += (r * c0 - r0 * c + count) / 2;
        })

        return sum;
    }
}

module.exports = new Challenge();
