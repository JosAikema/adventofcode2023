class Challenge {
    test_part1 = 19114
    test_part2 = 167409079868000
    noSplit = true

    flows = []
    parts = []
    A = []
    R = []
    parseInput(input) {
        this.parts = []
        this.flows = []
        let [flowsPart, partsPart] = input.split('\n\n')

        let flows = []
        flowsPart.split('\n').forEach((line) => {
            this.flows[line.split('{')[0]] = line.split('{')[1].split('}')[0].split(',')
        })

        let parts = []
        partsPart.split('\n').forEach((line) => {
            let partObject = line.substring(1, line.length-1).split(',')
            let part = {}
            partObject.forEach((p) => {
                part[p.split('=')[0]] = parseInt(p.split('=')[1])

            })
            this.parts.push(part)
        })

    }

    process(part, flowId) {
        let flow = this.flows[flowId]

        let destination = ''
        let found = false
        flow.forEach(step => {
            if (!found) {
                if (step.indexOf(':') === -1) {
                    destination = step
                } else {
                    found = false
                    let [condition, dest] = step.split(':')
                    let property = condition.charAt(0)
                    let operator = condition.charAt(1)
                    let value = parseInt(condition.substring(2))

                    switch (operator) {
                        case '=':
                            if (part[property] === value) {
                                destination = dest
                                found = true
                            }
                            break
                        case '<':
                            if (part[property] < value) {
                                destination = dest
                                found = true
                            }
                            break
                        case '>':
                            if (part[property] > value) {
                                destination = dest
                                found = true
                            }
                            break
                        case '!':
                            if (part[property] !== value) {
                                destination = dest
                                found = true
                            }
                            break
                    }
                }
            }

        })
        switch (destination) {
            case 'A':
                this.A.push(part)
                break;
            case 'R':
                this.R.push(part)
                break;
            default:
                this.process(part, destination)
        }

    }


    solve_part1 (input) {
        this.A = []
        this.R = []

        let sum = 0

        this.parseInput(input)

        this.parts.forEach((part) => {
            let result = this.process(part, 'in')
        })

        sum = this.A.reduce((acc, part) => {
            return acc + parseInt(part.x) + parseInt(part.m) + parseInt(part.a) + parseInt(part.s)
        },0)

        return sum
    }


    solve_part2 (input) {



        this.parseInput(input)

        let engine = {};

        Object.entries(this.flows).forEach(([name, steps]) => {
            engine[name] = (ranges) => {
                function calculate(target, ranges) {
                    return target === 'A'
                        ? Object.values(ranges)
                            .map((r) => {
                                return r.filter(v => !!v).length
                            })
                            .reduce((acc, n) => acc * n)
                        : target !== 'R'
                            ? engine[target](ranges)
                            : 0;
                }

                let sum = 0;

                steps.forEach((step) => {
                    if (step.includes(':')) {
                        let [condition, dest] = step.split(':')

                        let property = condition.charAt(0)
                        let operator = condition.charAt(1)
                        let value = parseInt(condition.substring(2))

                        const validRanges = JSON.parse(JSON.stringify(ranges));

                        for (let i = 0; i < 4000; i++) {
                            if ((operator === '>' && i + 1 <= value) || (operator === '<' && i + 1 >= value)) {
                                validRanges[property][i] = 0;
                            } else {
                                ranges[property][i] = 0;
                            }
                        }
                        sum += calculate(dest, validRanges);
                    } else {
                        sum += calculate(step, ranges);
                    }
                })
                return sum;
            };
        })

        const ranges = {
            x: Array(4000).fill(1),
            m: Array(4000).fill(1),
            a: Array(4000).fill(1),
            s: Array(4000).fill(1),
        };
        return engine['in'](ranges);
    }
}

module.exports = new Challenge();

