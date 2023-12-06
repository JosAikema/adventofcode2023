
class Challenge {



    solve_part1 (input) {
        let sum = 1;
        let times = input[0].split(':')[1].trimStart().trimEnd().replace(/\s+/g, ' ').split(' ')
        let distances = input[1].split(':')[1].trimStart().trimEnd().replace(/\s+/g, ' ').split(' ')

        times.forEach((time, index) => {
            let wins = 0
            for (let a=0; a<time; a++) {
                let total_distance = a * (time - a)
                if (total_distance > distances[index]) {
                    wins += 1
                }
            }
            sum *= wins
        })
        return sum
    }



    solve_part2 (input) {

        let sum = 1;
        let time = input[0].split(':')[1].trimStart().trimEnd().replace(/\s+/g, '')
        let distance = input[1].split(':')[1].trimStart().trimEnd().replace(/\s+/g, '')

        let wins = 0
        for (let a=0; a<time; a++) {
          let total_distance = a * (time - a)
          if (total_distance > distance) {
              wins += 1
          }
        }

        sum *= wins
        return sum
    }
}

module.exports = new Challenge();