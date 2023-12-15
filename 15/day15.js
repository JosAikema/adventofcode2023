class Challenge {
    test_part1 = 1320
    test_part2 = 145
    noSplit = true

    hash(str) {
        let sum = 0
        str.split('').forEach((ch, i) => {
            sum += ch.charCodeAt(0)
            sum = (17*sum) % 256
        })
        return sum
    }
    solve_part1 (input) {

        let sum = 0

        input.split(',').forEach((str, i) => {
            sum += this.hash(str)
        })
        return sum
    }

    calculcateFocusPower(boxes) {
        let sum = 0;
        boxes.forEach((box, idx) => {
            let sumPerBox = 0
            let idx2 = 1
            for (const [key, value] of Object.entries(box)) {
                sumPerBox += (idx + 1) * idx2 * value
                idx2++
            }
            sum += sumPerBox
        })
        return sum
    }


    solve_part2 (input) {

        let boxes = []
        input.split(',').forEach(instruction => {
            if (instruction.indexOf('-') > 0) {
                let label = instruction.slice(0, -1)
                if (boxes[this.hash(label)]) {
                    delete boxes[this.hash(label)][label]
                }
            } else {
                let [label, operator] = instruction.split('=')
                if (!boxes[this.hash(label)]) {
                    boxes[this.hash(label)] = []
                }
                boxes[this.hash(label)][label] = +operator
            }
        })
        return this.calculcateFocusPower(boxes)
    }
}

module.exports = new Challenge();
