class Challenge {
    test_part1 = 405
    test_part2 = 400
    noSplit = true

    checkVerticalReflects(pattern) {
        let columns = []

        for (let c=1;  c < pattern[0].length; c++) {
            let reflect = true
            for (let r=0; r < pattern.length; r++) {
                let left = ''
                let right = ''
                if (c > (pattern[r].length/2)) {
                    left = pattern[r].substring(2*c - pattern[r].length, c)
                    right = pattern[r].substring(c, pattern[r].length)
                } else {
                    left = pattern[r].substring(0, c)
                    right = pattern[r].substring(c, c + (c-0))
                }
                if (left !== right.split("").reverse().join("")) {
                    reflect = false
                    break;
                }
            }
            if (reflect) {
                columns.push(c)
            }

        }
        return columns
    }

    checkHorizontalReflects(pattern) {
        let rows = []
        for (let r = 0; r < pattern.length - 1; r++) {
            let up = ''
            let down = ''

            if (r < ((pattern.length - 1) / 2)) {
                for (let i = 0; i < r + 1; i++) {
                    up += pattern[i]

                }
                for (let i = 2 * r + 1; i > r; i--) {
                    down += pattern[i]
                }
            } else {
                for (let i = (2 * r) - pattern.length + 2; i < r + 1; i++) {
                    up += pattern[i]
                }
                for (let i = pattern.length - 1; i > r; i--) {
                    down += pattern[i]
                }
            }
            if (up === down) {
                rows.push(r + 1)
            }
        }
        return rows;
    }

    solve_part1 (input) {

        let sum = 0
        let patterns = input.split('\n\n')
        patterns.forEach(pattern => {
            let grid = pattern.split('\n')
            let verticalReflects = this.checkVerticalReflects(grid)
            sum += verticalReflects.reduce((a, b) => a + b, 0)
            let horizontalReflects = this.checkHorizontalReflects(grid)
            sum += horizontalReflects.reduce((a, b) => a + b*100, 0)
        })

        return sum
    }

    changeOne(grid, r, c) {
        let result = [...grid]
        result[r] = result[r].substring(0, c) + (result[r][c] === '#' ? '.' : '#') + result[r].substring(c + 1)
        return result

    }


    solve_part2 (input) {
        let sum = 0
        let patterns = input.split('\n\n')
        patterns.forEach(pattern => {
            let grid = pattern.split('\n')
            let found = false
            for (let r=0; r < grid.length; r++) {
                for (let c=0; c < grid[r].length; c++) {
                    let oldVerticalReflects = this.checkVerticalReflects(grid)
                    let oldHorizontalReflects = this.checkHorizontalReflects(grid)
                    let pattern = this.changeOne(grid, r, c )

                    let verticalReflects = this.checkVerticalReflects(pattern).filter(x => !oldVerticalReflects.includes(x))
                    let horizontalReflects = this.checkHorizontalReflects(pattern).filter(x => !oldHorizontalReflects.includes(x))
                    if (verticalReflects.length > 0 || horizontalReflects.length > 0) {
                        sum += verticalReflects.reduce((a, b) => a + b, 0)
                        sum += horizontalReflects.reduce((a, b) => a + b*100, 0)
                        found = true
                        break;
                    }

                }
                if (found) {
                    break;
                }
            }

        })

        return sum
    }
}

module.exports = new Challenge();