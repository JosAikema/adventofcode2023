class Challenge {

    parseInput (input) {
        let [instructions, mapNeeded] = input.split(/\n\s*\n/)
        instructions = instructions.trim();
        let mapArray = mapNeeded.split('\n')

        let map = []
        mapArray.forEach((line) => {
            let [idx, options] = line.split('=')
            map.push({
                idx: idx.trimEnd(),
                left: options.split(',')[0].trimStart().slice(1),
                right: options.split(',')[1].trimStart().slice(0, -1)
            })
        })

        return [map, instructions]
    }

    calculateSteps(map, instructions, start) {
        let steps = 0
        let test = start
        let dirIndex = 0
        while (test !== 'ZZZ') {
            let value = map.find((item) => item.idx === test)

            if (instructions[dirIndex] === 'L') {
                test = value.left
            } else {
                test = value.right
            }
            if (dirIndex === instructions.length - 1) {
                dirIndex = 0
            } else {
                dirIndex++
            }
            steps++
        }

        return steps
    }

    calculateStepsPart2(map, instructions, start) {
        let steps = 0
        let test = start
        let dirIndex = 0
        while (test.slice(-1) !== 'Z') {
            let value = map.find((item) => item.idx === test)

            if (instructions[dirIndex] === 'L') {
                test = value.left
            } else {
                test = value.right
            }
            if (dirIndex === instructions.length - 1) {
                dirIndex = 0
            } else {
                dirIndex++
            }
            steps++
        }

        return steps
    }




    solve_part1 (input) {

        let [map, instructions] = this.parseInput(input)
        let steps = this.calculateSteps(map, instructions, 'AAA')

        return steps
    }


    solve_part2 (input) {
        const lcm_two_numbers = (num1, num2) => {
            let hcf = null
            for (let i = 1; i <= num1 && i <= num2; i++) {
                if( num1 % i == 0 && num2 % i == 0) {
                    hcf = i;
                }
            }

            return (num1 * num2) / hcf;
        }

        const combinedLCM = steps => {
            return steps.reduce(lcm_two_numbers, 1);
        }

        let [map, instructions] = this.parseInput(input)
        let startLocations = map.filter((item) => item.idx.slice(-1) === 'A').map((item) => item.idx)

        let result = []
        startLocations.forEach((startLocation) => {
            let steps = this.calculateStepsPart2(map, instructions, startLocation)
            result.push({
                startLocation: startLocation,
                steps: steps
            })
        })
        let steps = combinedLCM(result.map((item) => item.steps))

        return steps
    }
}

module.exports = new Challenge();