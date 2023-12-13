class Challenge {
    test_part1 = 37422
    test_part2 = 8200021022


    findGalaxies(input) {

        let grid = []
        for (let r = 0; r < input.length; r++) {
            for (let c = 0; c < input[0].length; c++) {
                grid.push({r: r, c: c, ch: input[r][c]})
            }
        }
        let idx = 0
        let galaxies = grid.filter(x => x.ch === '#').map(item => {
            idx++
            return {r: item.r, c: item.c, idx: idx}
        })
        return galaxies
    }

    expandImage(image, extraweight) {
        let grid = []
        for (let r = 0; r < image.length; r++) {
            for (let c = 0; c < image[0].length; c++) {
                let col = ''
                for (let r=0; r < image.length; r++) {
                    col += image[r][c]
                }
                let weight = (col.indexOf('#') === -1 || image[r].indexOf('#') === -1) ? extraweight : 1
                grid.push({r: r, c: c, value: weight})
            }
        }
        return grid
    }

    calculcateDistance(grid, galaxy1, galaxy2) {
        let greatestRow = Math.max(galaxy1.r, galaxy2.r)
        let smallestRow = Math.min(galaxy1.r, galaxy2.r)
        let greatestCol = Math.max(galaxy1.c, galaxy2.c)
        let smallestCol = Math.min(galaxy1.c, galaxy2.c)
        let sum = 0
        let dy = 0

        for (let r = smallestRow; r < greatestRow; r++) {
            dy += grid.filter(cell => {
                return cell.r === r && cell.c === 0
            })[0].value
        }

        let dx = 0
        for (let c = smallestCol; c < greatestCol; c++) {
            dx += grid.filter(cell => {
                return cell.r === 0 && cell.c === c
            })[0].value
        }

        return dx + dy
    }




    solve_part1 (input) {
        let sum = 0

        let grid = this.expandImage(input,2)

        let galaxies = this.findGalaxies(input)

        for (let galaxy of galaxies) {
            for (let galaxy2 of galaxies) {
                if (galaxy !== galaxy2) {
                    let distance = this.calculcateDistance(grid, galaxy, galaxy2)
                    sum += distance
                }
            }
        }
        return sum / 2
    }


    solve_part2 (input) {

        let sum = 0

        let grid = this.expandImage(input,1000000)

        let galaxies = this.findGalaxies(input)

        for (let galaxy of galaxies) {
            for (let galaxy2 of galaxies) {
                if (galaxy !== galaxy2) {
                    let distance = this.calculcateDistance(grid, galaxy, galaxy2)
                    sum += distance
                }
            }
        }
        return sum / 2
    }
}

module.exports = new Challenge();