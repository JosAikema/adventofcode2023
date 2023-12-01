
class Challenge {

    solve_part1 (input) {
        let numbers= [];
        input.forEach((val, index) => {
            let digits = val.split(/ /)[0].replace(/[^\d]/g, '').split('')
            numbers.push(parseInt(digits[0] + digits.slice(-1)))
        })
        return numbers.reduce((a, b) => a + b, 0);

    }

    solve_part2 (input) {
        let numbers= [];
        let checkWords = ['one', '1', 'two', '2', 'three', '3', 'four', '4', 'five', '5', 'six', '6', 'seven', '7', 'eight', '8', 'nine', '9',];
        input.forEach((line, index) => {

            let indexes = []

            checkWords.forEach((word, index) => {
                indexes.push(line.indexOf(word)==-1?9999:line.indexOf(word))
            })

            let idx = indexes.indexOf(Math.min(...indexes));
            let first = Math.ceil((idx + 1 ) / 2 ).toString()

            indexes = []
            checkWords.forEach((word, index) => {
                indexes.push(line.lastIndexOf(word))
            })

            idx = indexes.indexOf(Math.max(...indexes));
            let last = Math.ceil((idx + 1 ) / 2 ).toString()

            numbers.push(parseInt(first + last))
        })
        return numbers.reduce((a, b) => a + b, 0);


    }
}

module.exports = new Challenge();