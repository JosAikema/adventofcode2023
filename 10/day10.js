const utils = require('../lib/utils');

class Challenge {
    test_part1 = 4
    test_part2 = 1
    findNeighbours (r, c) {
        let val = this.grid[r][c]
        let neighbours = []
        if (val === '|') {
            if (['|', '7', 'F'].includes(this.grid[r - 1][c])) {
                neighbours.push({r: r - 1,c: c})
            }
            if (['|', 'J', 'L'].includes(this.grid[r + 1][c])) {
                neighbours.push({r: r + 1,c: c})
            }
        }
        else if (val === '-') {
            if (['-', 'L', 'F'].includes(this.grid[r][c-1])) {
                neighbours.push({r: r ,c: c - 1})
            }
            if (['-', '7', 'J'].includes(this.grid[r][c+1])) {
                neighbours.push({r: r,c: c+1})
            }
        }
        else if (val === 'L') {
            if (['|', '7', 'F'].includes(this.grid[r-1][c])) {
                neighbours.push({r: r - 1, c: c})
            }
            if (['-', '7', 'J'].includes(this.grid[r][c+1])) {
                neighbours.push({r: r,c: c + 1})
            }
        }
        else if (val === 'J') {
            if (['|', '7', 'F'].includes(this.grid[r-1][c])) {
                neighbours.push({r: r - 1,c: c})
            }
            if (['-', 'L', 'F'].includes(this.grid[r][c - 1])) {
                neighbours.push({r: r,c: c - 1})
            }
        }
        else if (val === '7') {
            if (['-', 'L', 'F'].includes(this.grid[r][c-1])) {
                neighbours.push({r: r,c: c - 1})
            }
            if (['|', 'J', 'L'].includes(this.grid[r+1][c])) {
                neighbours.push({r: r + 1,c: c})
            }
        }
        else if (val === 'F') {
            if (['-', '7', 'J'].includes(this.grid[r][c+1])) {
                neighbours.push({r: r,c: c + 1})
            }
            if (['|', 'J', 'L'].includes(this.grid[r+1][c])) {
                neighbours.push({r: r + 1,c: c})
            }
        }
        return neighbours
    }

    loopMap(start) {
        let q = []
        q.push({r: start[0], c: start[1]})
        let dist = []


        //dist[start] = 0
        dist['r_' + start[0] + '_c_' + start[1]] = 0
        let visited = []
        visited['r_' + start[0] + '_c_' + start[1]] = true

        while (q.length > 0) {
            let v = q.pop()
            //if (goal != undefined && v == goal) {
                //break
               let neighbours = this.findNeighbours(v.r, v.c)
                for (let i in neighbours) {
                    let w =neighbours[i];
                    if (visited['r_' + w.r + '_c_' + w.c] === undefined) {
                        visited['r_' + w.r + '_c_' + w.c] = true
                        dist['r_' + w.r + '_c_' + w.c] = dist['r_' + v.r + '_c_' + v.c] + 1
                        q.unshift(w)
                    }
                }
            //}
        }
        return [dist, visited]
    }

    solve_part1 (input) {
        let sum = 0

        this.grid = utils.initialize2DArray(input.length, input[0].length,'.')
        let start = null

        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                this.grid[i][j] = input[i][j]
                if (input[i][j] === 'S') {
                    start = [i,j]
                }
            }
        }

        let pipes = ['|', '-', 'L', 'J', '7', 'F']
        for (let i = 0; i < pipes.length; i++) {
            this.grid[start[0]][start[1]] = pipes[i]
            if (this.findNeighbours(start[0], start[1]).length === 2) {
                break
            }
        }

        let [distances, visited] = this.loopMap([start[0], start[1]])

        let max = Math.max(...Object.values(distances));

        return max
    }


    solve_part2 (input) {

        this.grid = utils.initialize2DArray(input.length, input[0].length,'.')
        let start = null

        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                this.grid[i][j] = input[i][j]
                if (input[i][j] === 'S') {
                    start = [i,j]
                }
            }
        }

        let pipes = ['|', '-', 'L', 'J', '7', 'F']
        for (let i = 0; i < pipes.length; i++) {
            this.grid[start[0]][start[1]] = pipes[i]
            if (this.findNeighbours(start[0], start[1]).length === 2) {
                break
            }
        }

        let [distances, visited] = this.loopMap([start[0], start[1]])

        let result = 0
        for (let r= 0; r < this.grid.length; r++) {

            let left= 0
            for (let c=0; c < this.grid[r].length; c++) {
                if (visited['r_' + r + '_c_' + c] !== true && left % 2 === 1) {
                    result += 1
                }
                if (['|', 'L', 'J'].includes(this.grid[r][c]) && visited['r_' + r + '_c_' + c] === true) {
                    left += 1
                }
            }
        }

        return result
    }
}

module.exports = new Challenge();