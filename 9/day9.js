class Challenge {




    getSteps (item) {
        let steps = []
        for (let i = 1; i < item.length; i++) {
            steps.push(item[i] - item[i-1])
        }
        return steps
    }

    findRanges (range) {
        let ranges = []
        ranges.push(range.map((item) => parseInt(item)))
        let steps = this.getSteps(range.map((item) => parseInt(item)));
        ranges.push(steps)
        while (steps.filter((item) => item !== 0).length > 0) {
            steps = this.getSteps(steps)
            ranges.push(steps)
        }
        return ranges
    }

    findNextStep (ranges) {
        let step = 0
        ranges.reverse().forEach(range => {
            step = range.slice(-1)[0] + step
        })
        return step
    }


    solve_part1 (input) {

        let sum = 0
        input.forEach((item) => {
            let ranges = this.findRanges(item.split(' '))
            let step = this.findNextStep(ranges)
            sum += step
        })
        return sum
    }


    solve_part2 (input) {
       let sum = 0
        input.forEach((item) => {
            let ranges = this.findRanges(item.split(' ').reverse())
            let step = this.findNextStep(ranges)
            sum += step
        })
        return sum
    }
}

module.exports = new Challenge();