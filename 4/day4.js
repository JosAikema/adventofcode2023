
class Challenge {

    calculatePoints(card) {
        let points = 0;
        const [winningNumbers, numbers] = card.split(':')[1].split('|');

        numbers.trimStart().trimEnd().replace(/\s+/g, ' ').split(' ').forEach(number => {
            if (winningNumbers.trimStart().trimEnd().replace(/\s+/g, ' ').split(' ').includes(number)) {
                points++
            }
        })
        return points;

    }

    solve_part1 (input) {
        let sum = 0;

        input.forEach(line => {
            let points =  this.calculatePoints(line)
            if (points !== 0) {
                sum += Math.pow(2, points - 1)
            }
        })

        return sum;

    }

    solve_part2 (input) {

        let cards = [];

        input.forEach((line, idx) => {
            cards.push({
                id: idx+1,
                points: this.calculatePoints(line),
                count: 1
            })
        })

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i]
            for (let j = 1; j <= card.points; j++) {
                let foundIndex = cards.findIndex(x => x.id == card.id + j);
                cards[foundIndex].count += card.count
            }
        }
        return cards.reduce((a, b) => a + b.count, 0);

    }
}

module.exports = new Challenge();