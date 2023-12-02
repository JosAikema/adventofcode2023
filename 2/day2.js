
class Challenge {


    solve_part1 (input) {
        let greenCubes = 13
        let redCubes = 12
        let blueCubes = 14
        let sum = 0
        input.forEach((line, index) => {

            const [game, turns] = line.split(':')
            const [text, id] = game.split(' ');

            // loop through turns
            let correctGame = true

            turns.split(';').forEach((turn, index) => {
                let cubesInTurn = {
                    green: 0,
                    red: 0,
                    blue: 0
                }
                turn.split(', ').forEach((cubes, index) => {
                    const [cnt, color] = cubes.trimStart().split(' ');
                    switch (color) {
                        case 'green':
                            cubesInTurn.green += cnt
                            break;
                        case 'red':
                            cubesInTurn.red += cnt
                            break;
                        case 'blue':
                            cubesInTurn.blue += cnt
                            break;
                    }
                })
                if (cubesInTurn.green > greenCubes || cubesInTurn.red > redCubes || cubesInTurn.blue > blueCubes) {
                    correctGame = false
                }
            })
            if (correctGame) sum += parseInt(id)
        })
        return sum
    }

    solve_part2 (input) {
        let sum = 0
        // loop through games
        input.forEach((line, index) => {
            const [game, turns] = line.split(':')
            let cubesInTurn = {
                green: 0,
                red: 0,
                blue: 0
            }
            const [text, id] = game.split(' ');

            // loop through turns
            turns.split(';').forEach((turn, index) => {
                turn.split(', ').forEach((cubes, index) => {
                    const [cnt, color] = cubes.trimStart().split(' ');
                    switch (color) {
                        case 'green':
                            cubesInTurn.green = Math.max(cubesInTurn.green, cnt)
                            break;
                        case 'red':
                            cubesInTurn.red = Math.max(cubesInTurn.red, cnt)
                            break;
                        case 'blue':
                            cubesInTurn.blue = Math.max(cubesInTurn.blue, cnt)
                            break;
                        default:
                            break;
                    }
                })
            })
            sum += (cubesInTurn.green * cubesInTurn.red * cubesInTurn.blue)
        })
        return sum
    }
}

module.exports = new Challenge();